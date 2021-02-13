window.onload = function () {

  // создание таблицы

  const plan = document.querySelector('.calendar');
  let table = '<table><tr><th>Name</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th></tr><tr>';
  const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
  const time = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  let arrActive = [];

  for (i = 0; i < 9; i++) {
    table += "<tr>";
    table += `<td>1${i}:00</td>`;

    for (k = 0; k < days.length; k++) {
      table += `<td class='${days[k]}${time[i]}'><span class='text${days[k]}${time[i]}'></span><b class='sign${days[k]}${time[i]}'></b></td>`;
      arrActive.push(days[k] + time[i]);
    }
  }
  table += "</tr>";
  plan.innerHTML = table;

  // блок ивента

  const button = document.querySelector('.button');
  button.addEventListener('click', function () {
    document.querySelector('.newEvent').style.visibility = "visible";
  })

  // создание ивента

  btnCreateEvent.addEventListener('click', function () {

    let text = eventText.value;
    let par = participants.value;
    let day = eventDay.value;
    let time = eventTime.value;
    let block = day + time;
    if (document.querySelector(`.${block}`).hasAttribute('name') != true) {
      if (text.trim() != '') {
        document.querySelector(`.${block}`).setAttribute('name', par);
        document.querySelector('.newEvent').style.visibility = "hidden";
        document.querySelector('.error').style.visibility = "hidden";
        document.querySelector(`.text${block}`).textContent = text;
        document.querySelector(`.${block}`).classList.add('active');
        document.querySelector(`.sign${block}`).classList.add('activeSpan');
        eventText.style.border = '1px solid grey';
      } else {
        eventText.style.border = "1px solid red";
      }
    } else {
      document.querySelector('.error').style.visibility = "visible";
    }


  })

  // блок ошибки

  btnCancelEvent.addEventListener('click', function () {
    document.querySelector('.newEvent').style.visibility = "hidden";
    document.querySelector('.error').style.visibility = "hidden";
  });

  let arrB = document.querySelectorAll('.calendar b');

  for (i = 0; i < arrB.length; i++) {
    arrB[i].addEventListener('click', function (e) {
      elemClass = e.target.parentElement.classList[0];
      document.querySelector('.delete p').textContent = `Are you sure you want to delete '"${document.querySelector(`.${elemClass} span`).textContent}"' event?`;
      document.querySelector('.delete').style.display = 'block';
      deleteYes.onclick = () => {
        document.querySelector(`.${elemClass}`).classList.remove('active');
        document.querySelector(`.${elemClass} b`).classList.remove('activeSpan');
        document.querySelector(`.${elemClass} span`).textContent = '';
        document.querySelector(`.${elemClass}`).removeAttribute('name');
        document.querySelector('.delete').style.display = 'none';
      }
      deleteNo.onclick = () => {
        document.querySelector('.delete').style.display = 'none';
      }
    });
  }

  // фильтр

  document.querySelector('#name').onchange = () => {
    const sel = document.getElementById("name");
    let option = sel.options[sel.selectedIndex].text;
    let activeBlocks = document.querySelectorAll(`.active`);
    for (i = 0; i < activeBlocks.length; i++) {
      let elem = document.querySelector(`.${activeBlocks[i].classList[0]}`);
      let elemB = document.querySelector(`.${activeBlocks[i].classList[0]} b`);
      let elemSpan = document.querySelector(`.${activeBlocks[i].classList[0]} span`);
      if (elem.getAttribute(`name`) == option) {
        elemSpan.style.fontSize = '20px';
        elem.classList.remove('visible');
        elemB.classList.remove('visibleSpan');


      } else if (option == 'All members') {
        elemSpan.style.fontSize = '20px';
        elem.classList.remove('visible');
        elemB.classList.remove('visibleSpan');
      }
      else {
        elemSpan.style.fontSize = '0px';
        elem.classList.add('visible');
        elemB.classList.add('visibleSpan');
      }
    }
  }
}
