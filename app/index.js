import './css/index.css';
const App = {
  init: function() {
    this.addListeners();
  },
  addListeners: function() {
    const helpButton = document.querySelector('.accordion');
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
        handleCloseButton('open', 'fa-long-arrow-up', 'fa-long-arrow-down');
      } else {
        panel.style.display = 'block';
        panel.style.borderTop = 'none';
        this.style.borderBottom = 'none';
        this.style.borderBottomLeftRadius = 0;
        this.style.borderBottomRightRadius = 0;
        panel.style.borderTopLeftRadius = 0;
        panel.style.borderTopRightRadius = 0;
        panel.style.maxHeight = panel.scrollHeight + "px";
        handleCloseButton('close', 'fa-long-arrow-down', 'fa-long-arrow-up');
      }
    });
    const handleCloseButton = (text, addClass, removeClass) => {
      const closeButtonText = document.querySelector('.close-button p');
      const closeButtonIcon = document.querySelector('.close-button i');
      closeButtonText.innerHTML = text;
      closeButtonIcon.classList.remove(removeClass);
      closeButtonIcon.classList.add(addClass);
    }

    const inputs = document.querySelectorAll('.user-info-left input');
    inputs.forEach((input) => {
      input.addEventListener('focus', function() {
        this.nextElementSibling.style.display = 'block';
        // this.nextElementSibling.style.marginBottom = '5px';
        this.style.marginBottom = 0;
      }, true);

      input.addEventListener('blur', function() {
        this.nextElementSibling.style.display = 'none';
        // this.nextElementSibling.style.marginBottom = 0;
        this.style.marginBottom = '30px';
      }, true);
    });
  }
}

App.init();
