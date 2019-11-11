$('document').ready(function() {
  const tooltipEl = `<div class="tooltip"></div>`;
  $('body').append(tooltipEl);


  const showTooltip = (el) => {
    const tooltip = $('.tooltip');
    let tooltipText = el.attr('data-tooltip');
    let tooltipPos = el.attr('data-tooltip-position');

    let posX, posY;

    tooltipPos == undefined ? tooltipPos = 'bottom' : null;

    $(tooltip).removeClass('top bottom right left').html(tooltipText).addClass(tooltipPos);

    switch (tooltipPos) {
      case 'bottom':
        posX = el.offset().left - ((tooltip.outerWidth() / 2) - (el.outerWidth() / 2));
        posY = el.offset().top + el.outerHeight() + 10;
        break;
      case 'top':
        posX = el.offset().left - ((tooltip.outerWidth() / 2) - (el.outerWidth() / 2));
        posY = el.offset().top - tooltip.outerHeight() - 10;
        break;
      case 'left':
        posX = el.offset().left - tooltip.outerWidth() - 10;
        posY = el.offset().top + ((el.outerHeight() / 2) - (tooltip.outerHeight() / 2));
        break;
      case 'right':
        posX = el.offset().left + el.outerWidth() + 10;
        posY = el.offset().top + ((el.outerHeight() / 2) - (tooltip.outerHeight() / 2));
        break;
      default:
        posX = el.offset().left - ((tooltip.outerWidth() / 2) - (el.outerWidth() / 2));
        posY = el.offset().top + el.outerHeight() + 10;
    }

    TweenMax.set(tooltip, {
      display: 'block',
      left: posX,
      top: posY
    });
  }

  const hideTooltip = () => {
    const tooltip = $('.tooltip');
    TweenMax.set(tooltip, {
      display: 'none',
      top: 0,
      left: 0
    });
  }

  $('body').on('mouseover', '[data-tooltip]', function() {
    console.log('reee');
    showTooltip($(this));
  }).on('mouseout', hideTooltip);
});
