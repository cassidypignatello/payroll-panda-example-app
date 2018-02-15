import './css/index.css';
const App = {
  init: function() {
    this.buildList();
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
        this.style.marginBottom = 0;
      }, true);

      input.addEventListener('blur', function() {
        this.nextElementSibling.style.display = 'none';
        this.style.marginBottom = '30px';
      }, true);
    });

    const tableRows = document.querySelectorAll('div ~ .tr');
    tableRows.forEach(function(row) {
      row.addEventListener('mouseenter', function() {
        const deleteIcon = this.lastChild.firstChild;
        deleteIcon.style.display = 'block';
        deleteIcon.addEventListener('click', () => {
          this.remove();
        });
      });

      row.addEventListener('mouseleave', function() {
        this.lastChild.firstChild.style.display = 'none';
      });
    });

    var form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
      const formElements = form.elements;
      const elements = [...form.elements];
      const fullName = formElements.fullname.value;
      const email = formElements.email.value;
      const city = formElements.city.value;
      const group = elements.find((element) => (
        element.id === 'group' && element.checked
      )).value;
      const daysArr = elements.filter((element) => (
        element.id === 'days' && element.checked
      ));
      const days = [];
      for (let i = 0; i < daysArr.length; i++) {
        days.push(daysArr[i].value);
      }
      const getDate = () => {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        const year = today.getFullYear();
        const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        if (date < 10) {
          date = `0${date}`;
        }
        if (month < 10) {
          month = `0${month}`;
        }
        today = `${date}/${month}/${year}`;
        return `${today} ${time}`;
      }

      console.log(getDate());
      e.preventDefault();
    });
  },
  buildList: function() {
    const bikers = [
      {name: 'James Isaac Neutron', email: 'neutron@example.com', city: 'City', group: 'Always', days: 'Every day', date: '13/08/2018', time: '11:29AM'},
      {name: 'Carl Wheezer', email: 'carl@example.com', city: 'City', group: 'Sometimes', days: 'Week days', date: '19/04/2019', time: '00:29AM'},
      {name: 'Cindy Vortex', email: 'cindyvortex@example.com', city: 'City', group: 'Never', days: 'Weekends', date: '13/08/2018', time: '11:29AM'},
      {name: 'Sheen Estevez', email: 'sheen@example.com', city: 'City', group: 'Sometimes', days: 'Mon, Wed, Fri', date: '19/04/2019', time: '00:29AM'},
      {name: 'Libby Folfax', email: 'folfax2014@example.com', city: 'City', group: 'Sometimes', days: 'Mon, Tue, Wed', date: '13/08/2018', time: '11:29AM'},
      {name: 'Nick Dean', email: 'nickd@example.com', city: 'City', group: 'Always', days: 'Fri, Sat', date: '13/08/2013', time: '11:29AM'}
    ];
    const table = document.querySelector('.table');
    bikers.forEach(function(biker) {
      const newRow = document.createElement('div');
      newRow.classList.add('tr');

      function createCell(text) {
        const newCell = document.createElement('div');
        newCell.classList.add('td');
        if (text === 'icon') {
          const icon = document.createElement('i');
          icon.classList.add('fa', 'fa-trash-o', 'fa-lg');
          newCell.appendChild(icon);
        } else {
          newCell.appendChild(document.createTextNode(text));
        }
        return newCell;
      }

      const newCells = [
        createCell(biker.name),
        createCell(biker.email),
        createCell(biker.city),
        createCell(biker.group),
        createCell(biker.days),
        createCell(`${biker.date} ${biker.time}`),
        createCell('icon')
      ];

      const docFrag = document.createDocumentFragment();
      for (var i = 0; i < newCells.length; i++) {
        docFrag.appendChild(newCells[i]);
      }
      newRow.appendChild(docFrag);
      table.appendChild(newRow);
    });
  }
}

App.init();
