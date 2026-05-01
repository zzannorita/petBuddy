(function () {
  var distance = document.querySelector('#matching-distance');
  var distanceOut = document.querySelector('#matching-distance-out');
  if (distance && distanceOut) {
    function sync() {
      distanceOut.textContent = distance.value;
    }
    distance.addEventListener('input', sync);
    sync();
  }

  document.querySelectorAll('[data-chip-group]').forEach(function (group) {
    group.querySelectorAll('.matching-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        chip.classList.toggle('is-active');
      });
    });
  });

  var hint = document.querySelector('.matching-scroll-hint__btn');
  var list = document.querySelector('.matching-results__list');
  if (hint && list) {
    hint.addEventListener('click', function () {
      list.scrollIntoView({ behavior: 'smooth', block: 'end' });
      window.scrollBy(0, 120);
    });
  }
})();
