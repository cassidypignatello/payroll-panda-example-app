import './css/index.css';
const App = {
  init: function(){
    this.addListeners();
  },
  addListeners: function(){
    const helpButton = document.querySelector('.accordion');
    const closeButton = document.querySelector('.close-button');
    const closeButtonText = document.querySelector('.close-button p');
    const closeButtonIcon = document.querySelector('.close-button i');
    const newIcon = document.createElement('i');
    helpButton.addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.display === 'block' && panel.style.maxHeight) {
        panel.style.display = 'none';
        panel.style.borderTop = '1px solid #e3e3e3';
        this.style.borderBottom = '1px solid #e3e3e3';
        this.style.borderBottomLeftRadius = '4px';
        this.style.borderBottomRightRadius = '4px';
        panel.style.maxHeight = null;
        closeButtonText.innerHTML = 'open';
        closeButtonIcon.classList.remove('fa-long-arrow-up');
        closeButtonIcon.classList.add('fa-long-arrow-down');
      } else {
        panel.style.display = 'block';
        panel.style.borderTop = 'none';
        this.style.borderBottom = 'none';
        this.style.borderBottomLeftRadius = 0;
        this.style.borderBottomRightRadius = 0;
        panel.style.borderTopLeftRadius = 0;
        panel.style.borderTopRightRadius = 0;
        panel.style.maxHeight = panel.scrollHeight + "px";
        closeButtonText.innerHTML = 'close';
        closeButtonIcon.classList.remove('fa-long-arrow-down');
        closeButtonIcon.classList.add('fa-long-arrow-up');
      }
    });
  }
}

App.init();
