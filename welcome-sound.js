class WelcomeSound {
  constructor() {
    this.hasPlayed = this.getPlayedStatus();
    this.initializeAudio();
  }
  
  initializeAudio() {
    // Check for session storage to avoid playing on every page refresh
    if (this.hasPlayed) {
      return;
    }
    
    // Create the welcome message using Text-to-Speech API
    this.generateWelcomeAudio();
    
    // Create welcome toast notification
    this.createWelcomeToast();
    
    // Mark as played
    this.setPlayedStatus();
  }
  
  async generateWelcomeAudio() {
    try {
      // First try with websim.textToSpeech if available
      if (typeof websim !== 'undefined' && typeof websim.textToSpeech === 'function') {
        const result = await websim.textToSpeech({
          text: "أهلاً بك يا طالب العلم ويا محارباً! انهض، فأنت في أفضل أوقاتك. أنت في أفضل موقع لتنظيم دراستك!",
          voice: "ar-male"
        });
        
        if (result && result.url) {
          this.playWelcomeAudio(result.url);
          return;
        }
      }
      
      // Fallback to a pre-recorded audio file
      this.playWelcomeAudio("https://audio.example.com/welcome-ar.mp3");
    } catch (error) {
      console.error("Failed to generate welcome audio:", error);
      // Silently fail if audio generation doesn't work
    }
  }
  
  playWelcomeAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.volume = 0.7;
    
    // Wait for a user interaction event to play the audio
    // as browsers often block autoplay
    const playAudio = () => {
      audio.play().catch(err => {
        console.log("Could not play audio automatically:", err);
      });
      
      // Show the toast when audio starts playing
      this.showWelcomeToast();
      
      // Remove event listeners after playing
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
    
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('touchstart', playAudio, { once: true });
    
    // Also try to autoplay (might be blocked by browsers)
    audio.play().then(() => {
      this.showWelcomeToast();
    }).catch(err => {
      console.log("Autoplay prevented, waiting for user interaction:", err);
    });
  }
  
  createWelcomeToast() {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = `
      <div class="welcome-toast-content">
        <div class="welcome-toast-icon">🎓</div>
        <div class="welcome-toast-text">
          <div class="welcome-toast-title">أهلاً بك في موقع تنظيم!</div>
          <div class="welcome-toast-message">مرحباً بك يا طالب العلم ويا محارباً!</div>
        </div>
        <button class="welcome-toast-close">×</button>
      </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .welcome-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(14, 12, 40, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 15px;
        min-width: 300px;
        max-width: 90%;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        border: 1px solid rgba(255,215,0,0.3);
        opacity: 0;
        transition: all 0.5s ease;
        transform: translateX(-50%) translateY(-20px);
        pointer-events: none;
      }
      
      .welcome-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
        pointer-events: auto;
      }
      
      .welcome-toast-content {
        display: flex;
        align-items: center;
      }
      
      .welcome-toast-icon {
        font-size: 2rem;
        margin-right: 15px;
        color: gold;
      }
      
      .welcome-toast-text {
        flex-grow: 1;
      }
      
      .welcome-toast-title {
        font-weight: bold;
        color: gold;
        margin-bottom: 5px;
      }
      
      .welcome-toast-message {
        color: white;
      }
      
      .welcome-toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
      }
      
      .welcome-toast-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // Add event listener for close button
    toast.querySelector('.welcome-toast-close').addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 500);
    });
  }
  
  showWelcomeToast() {
    const toast = document.querySelector('.welcome-toast');
    if (toast) {
      toast.classList.add('show');
      
      // Auto hide after 10 seconds
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 10000);
    }
  }
  
  getPlayedStatus() {
    return sessionStorage.getItem('welcomeAudioPlayed') === 'true';
  }
  
  setPlayedStatus() {
    sessionStorage.setItem('welcomeAudioPlayed', 'true');
    this.hasPlayed = true;
  }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.welcomeSound = new WelcomeSound();
});