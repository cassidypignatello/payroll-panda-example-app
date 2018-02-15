import './css/index.css';
const App = {
  init: function() {
    this.buildList();
    this.addListeners();
  },
  addListeners: function() {
    const helpButton = document.querySelector('.accordion');
    const panel = helpButton.nextElementSibling;
    helpButton.addEventListener('click', function() {
      this.classList.toggle('active');
      if (panel.style.display === 'block') {
        styleHelpbox.call(this, 'none', '1px solid #e3e3e3', '1px solid #e3e3e3', '4px', '4px', '4px', '4px', null);
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
    const styleHelpbox = function(display, borderTop, borderBottom, borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius, maxHeight) {
      panel.style.display = display;
      panel.style.borderTop = borderTop;
      this.style.borderBottom = borderBottom;
      this.style.borderBottomLeftRadius = borderBottomLeftRadius;
      this.style.borderBottomRightRadius = borderBottomRightRadius;
      panel.style.borderTopLeftRadius = borderTopLeftRadius;
      panel.style.borderTopRightRadius = borderTopRightRadius;
      panel.style.maxHeight = maxHeight;
      console.log(arguments);
    }

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
      this.addRow(fullName, email, city, group.charAt(0).toUpperCase() + group.slice(1), days.join(', '), getDate(), 'icon');
      e.preventDefault();
    }.bind(this));
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

    bikers.forEach(function(biker) {
      this.addRow(biker.name, biker.email, biker.city, biker.group, biker.days, `${biker.date} ${biker.time}`, 'icon');
    }.bind(this));
  },
  createCell: function(text) {
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
  },
  addRow: function(name, email, city, group, days, date, icon) {
    const table = document.querySelector('.table');
    const newRow = document.createElement('div');
    if (days === 'Sun, Mon, Tue, Wed, Thu, Fri, Sat') {
      days = 'Every day';
    } else if (days === 'Mon, Tue, Wed, Thu, Fri') {
      days = 'Week days';
    } else if (days === 'Sun, Sat') {
      days = 'Weekends';
    }
    newRow.classList.add('tr');
    const newCells = [
      this.createCell(name),
      this.createCell(email),
      this.createCell(city),
      this.createCell(group),
      this.createCell(days),
      this.createCell(date),
      this.createCell(icon)
    ];

    const docFrag = document.createDocumentFragment();
    for (var i = 0; i < newCells.length; i++) {
      docFrag.appendChild(newCells[i]);
    }
    newRow.appendChild(docFrag);
    table.appendChild(newRow);
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
  }
}

App.init();
