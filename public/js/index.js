window.addEventListener('load', () => {
  if (localStorage.getItem('buttons')) {
    let btns = localStorage.getItem('buttons');
    btns = btns.split(',');
    btns.forEach(btn => {
      const active = document.querySelector(btn).parentElement.parentElement;
      active.classList.add('filter-btn');
    });

    console.log(btns);
  }
});

const filterSearch = (btn, href) => {
  document.querySelector(btn).addEventListener('click', function (e) {
    const target = event.target;
    const url = window.location.href;
    const category = href.split('=')[0];
    const value = href.split('=')[1];

    let buttons = [];

    if (localStorage.getItem('buttons')) {
      buttons = [localStorage.getItem('buttons')];
    }
    console.log(buttons);
    buttons.push(btn);

    localStorage.setItem('buttons', buttons);

    let currentValue;
    if (url.includes(category)) {
      const querys = url.split('?')[1].split('&');
      querys.forEach(el => {
        if (el.startsWith(category)) {
          currentValue = el.split('=')[1];
        }
      });
    }

    URL = url.replace(currentValue, value);

    if (URL.includes('?') && !URL.includes(category)) {
      target.href = `${URL}&${href}`;
    } else if (url.includes(category)) {
      target.href = `${URL}`;
    } else {
      target.href = `${url}?${href}`;
    }
  });
};

filterSearch('.btn-male', 'sex=male');
filterSearch('.btn-female', 'sex=female');
filterSearch('.btn-dog', 'species=dog');
filterSearch('.btn-cat', 'species=cat');
filterSearch('.btn-fixed', 'fixed=true');
filterSearch('.btn-not-fixed', 'fixed=false');
filterSearch('.btn-adopted', 'adopted=true');
filterSearch('.btn-not-adopted', 'adopted=false');

document.querySelector('.home-link').addEventListener('click', e => {
  localStorage.clear();
});
