let toasts = 0;

const toast = (type, message) => {
  const tl = new TimelineMax();
  const toastEl = $(`<div class="toast ${type}">${message}</div>`);

  $('body').append(toastEl);

  tl.to(toastEl, .25, {
    opacity: 1,
    y: 0 + (66 * toasts),
    ease: Power4.easeOut,
    onComplete: function() {
      toasts++;
    }
  });
  tl.to(toastEl, .5, {
    delay: 2,
    y: '-100px',
    opacity: 0,
    ease: Power4.easeOut,
    onComplete: function() {
      toastEl.remove();
      toasts--;
    }
  });
}


$('body').on('click', '[data-toast]', function() {
  let toastText = $(this).attr('data-toast');
  toast('success', toastText);
});
