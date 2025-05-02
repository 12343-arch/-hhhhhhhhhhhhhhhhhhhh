// Motivational Quotes System
class MotivationalSystem {
  constructor() {
    this.quotes = [
      { text: "العلم يرفع بيتًا لا عماد له، والجهل يهدم بيت العز والكرم", author: "الشافعي" },
      { text: "العلم كالماء: إن لم يتجدد أسن", author: "حكمة عربية" },
      { text: "من طلب العلا سهر الليالي", author: "المتنبي" },
      { text: "لا تؤجل عمل اليوم إلى الغد", author: "بنجامين فرانكلين" },
      { text: "الوقت كالسيف إن لم تقطعه قطعك", author: "حكمة عربية" },
      { text: "طالب العلم مثل النحلة، يأخذ من كل زهرة رحيقًا", author: "ابن القيم" },
      { text: "السعادة هي الطريق وليست المحطة", author: "مصطفى محمود" },
      { text: "التفاؤل هو الإيمان الذي يؤدي إلى الإنجاز", author: "هيلين كيلر" },
      { text: "عندما تعمل لغد أفضل، يصبح اليوم أفضل أيضًا", author: "أوشو" },
      { text: "القراءة للعقل مثل الرياضة للجسد", author: "جوزيف أديسون" },
      { text: "لا تتفوق عليهم، تفوق على نفسك بالأمس", author: "أرسطو" },
      { text: "ابدأ من حيث أنت، استخدم ما لديك، افعل ما تستطيع", author: "آرثر آش" },
      { text: "المعرفة قوة", author: "فرانسيس بيكون" },
      { text: "اصنع الفرص، لا تنتظرها", author: "آرثر آش" },
      { text: "إن مع العسر يسراً", author: "القرآن الكريم" },
      { text: "كل الأشياء صعبة قبل أن تصبح سهلة", author: "توماس فولر" },
      { text: "في قلب كل شتاء ربيع نابض", author: "خليل جبران" },
      { text: "لا شيء مستحيل في عالم الإرادة", author: "نابليون بونابرت" },
      { text: "ما ضاع حق وراءه مطالب", author: "أحمد شوقي" },
      { text: "لا يمكنك عبور البحر بمجرد الوقوف والنظر إلى الماء", author: "رابندرانات طاغور" }
    ];
    
    this.images = [
      "https://source.unsplash.com/random/800x600/?motivation",
      "https://source.unsplash.com/random/800x600/?study",
      "https://source.unsplash.com/random/800x600/?success",
      "https://source.unsplash.com/random/800x600/?achievement",
      "https://source.unsplash.com/random/800x600/?books",
      "https://source.unsplash.com/random/800x600/?graduation",
      "https://source.unsplash.com/random/800x600/?knowledge"
    ];
    
    this.createMotivationalComponents();
    this.setupEventListeners();
    this.showRandomQuote();
    this.setupQuoteInterval();
  }
  
  createMotivationalComponents() {
    // Create the floating quote component
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'floating-quote';
    quoteContainer.innerHTML = `
      <div class="quote-content">
        <div class="quote-text"></div>
        <div class="quote-author"></div>
      </div>
      <button class="quote-refresh">↻</button>
    `;
    document.body.appendChild(quoteContainer);
    
    // Create the motivational popup
    const motivationalPopup = document.createElement('div');
    motivationalPopup.className = 'motivational-popup';
    motivationalPopup.innerHTML = `
      <div class="popup-content">
        <span class="close-popup">&times;</span>
        <div class="popup-image">
          <img src="" alt="صورة تحفيزية">
        </div>
        <div class="popup-quote">
          <div class="popup-quote-text"></div>
          <div class="popup-quote-author"></div>
        </div>
        <button class="popup-action">استمر بالتفوق!</button>
      </div>
    `;
    document.body.appendChild(motivationalPopup);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .floating-quote {
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: rgba(14, 12, 40, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        padding: 15px;
        max-width: 300px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 100;
        display: flex;
        justify-content: space-between;
        border: 1px solid rgba(255,215,0,0.3);
        transition: transform 0.3s, opacity 0.3s;
      }
      
      .floating-quote:hover {
        transform: translateY(-5px);
      }
      
      .quote-content {
        flex-grow: 1;
        margin-right: 10px;
      }
      
      .quote-text {
        color: #fff;
        font-size: 1rem;
        margin-bottom: 5px;
        line-height: 1.4;
      }
      
      .quote-author {
        color: gold;
        font-size: 0.8rem;
        text-align: left;
      }
      
      .quote-refresh {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0.7;
        transition: transform 0.3s, opacity 0.3s;
      }
      
      .quote-refresh:hover {
        transform: rotate(180deg);
        opacity: 1;
      }
      
      .motivational-popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        align-items: center;
        justify-content: center;
      }
      
      .popup-content {
        background: linear-gradient(145deg, #0f1331, #42275a);
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        padding: 20px;
        position: relative;
        box-shadow: 0 0 30px rgba(255,215,0,0.3);
        border: 1px solid rgba(255,215,0,0.2);
        animation: popup-appear 0.5s ease-out;
      }
      
      @keyframes popup-appear {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      
      .close-popup {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 1.5rem;
        cursor: pointer;
        color: #fff;
        opacity: 0.7;
      }
      
      .close-popup:hover {
        opacity: 1;
      }
      
      .popup-image {
        margin: -20px -20px 20px;
        height: 200px;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
      }
      
      .popup-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .popup-quote {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .popup-quote-text {
        font-size: 1.4rem;
        color: #fff;
        margin-bottom: 10px;
        line-height: 1.5;
      }
      
      .popup-quote-author {
        color: gold;
        font-size: 1rem;
      }
      
      .popup-action {
        display: block;
        width: 100%;
        padding: 12px;
        background: linear-gradient(45deg, #f57c00, #fbc02d);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s;
      }
      
      .popup-action:hover {
        transform: scale(1.03);
      }
      
      @media (max-width: 768px) {
        .floating-quote {
          bottom: 70px;
          max-width: 250px;
        }
        
        .popup-content {
          width: 95%;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  setupEventListeners() {
    // Quote refresh button
    document.querySelector('.quote-refresh').addEventListener('click', () => {
      this.showRandomQuote();
    });
    
    // Close popup button
    document.querySelector('.close-popup').addEventListener('click', () => {
      document.querySelector('.motivational-popup').style.display = 'none';
    });
    
    // Popup action button
    document.querySelector('.popup-action').addEventListener('click', () => {
      document.querySelector('.motivational-popup').style.display = 'none';
      
      // Add XP for motivational engagement
      if (window.xpSystem) {
        window.xpSystem.addXP(5);
      }
    });
  }
  
  getRandomQuote() {
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }
  
  getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
  
  showRandomQuote() {
    const quote = this.getRandomQuote();
    
    document.querySelector('.quote-text').textContent = `"${quote.text}"`;
    document.querySelector('.quote-author').textContent = `- ${quote.author}`;
    
    // Animate the quote
    const quoteElement = document.querySelector('.floating-quote');
    quoteElement.style.opacity = '0';
    setTimeout(() => {
      quoteElement.style.opacity = '1';
    }, 300);
  }
  
  setupQuoteInterval() {
    // Change quote every 5 minutes
    setInterval(() => {
      this.showRandomQuote();
    }, 5 * 60 * 1000);
  }
  
  showMotivationalPopup() {
    const popup = document.querySelector('.motivational-popup');
    const quote = this.getRandomQuote();
    const image = this.getRandomImage();
    
    document.querySelector('.popup-quote-text').textContent = `"${quote.text}"`;
    document.querySelector('.popup-quote-author').textContent = `- ${quote.author}`;
    document.querySelector('.popup-image img').src = image;
    
    popup.style.display = 'flex';
  }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.motivationalSystem = new MotivationalSystem();
  
  // Show motivational popup after 3 minutes on the site
  setTimeout(() => {
    window.motivationalSystem.showMotivationalPopup();
  }, 3 * 60 * 1000);
  
  // Also show popup after completing 3 tasks
  let completedTasks = 0;
  const originalMarkDone = window.markDone;
  
  if (typeof originalMarkDone === 'function') {
    window.markDone = function(button) {
      originalMarkDone(button);
      completedTasks++;
      
      if (completedTasks % 3 === 0) {
        window.motivationalSystem.showMotivationalPopup();
      }
    };
  }
});
