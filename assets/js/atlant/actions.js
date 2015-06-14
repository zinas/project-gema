/**
 * Simply JS actions and bindings just used for graphics
 */
(function () {
  var button = document.querySelector('[data-js="account-menu"]');
  if ( button ) {
    button.addEventListener('click', function (e) {
      if ( this.classList.contains('active') ) {
        this.classList.remove('active');
      } else {
        this.classList.add('active');
      }
    });
  }
})();