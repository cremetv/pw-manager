const electron = require('electron');
const $ = require('jquery');
const ClipboardJS = require('clipboard');
const gsap = require('gsap');
const fs = require('fs');

new ClipboardJS('.copy');

var shell = require('electron').shell;
//open links externally by default
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});



const win = electron.remote.getCurrentWindow();
win.on('blur', () => {
  $('html').addClass('no-focus')
})
win.on('focus', () => {
  $('html').removeClass('no-focus')
})



/*
* Menu Toggle
*/
const burger = $('.main-nav .burger')
const menu = $('.main-nav .menu')
const mainMenu = $('.main-nav .main-menu')

burger.on('click', e => {
  e.preventDefault()

  if (menu.hasClass('open')) {
    menu.removeClass('open')
    TweenMax.to(mainMenu, .25, {
      height: 0,
      ease: Quad.easeInOut
    })
  } else {
    menu.addClass('open')
    TweenMax.set(mainMenu, {
      height: 'auto'
    })
    TweenMax.from(mainMenu, .4, {
      height: 0,
      ease: Quad.easeInOut
    })
  }
})



/*
* Fill client list
*/
const fillList = clients => {
  const list = $('.client-list');

  clients.reverse();

  clients.forEach(client => {
    let el = `<li class="client searchable">
                <div class="client__number">
                  <div class="client__number__copy list-btn copy ${client.clientNr ? 'active' : 'disabled'}" data-clipboard-text="${client.clientNr}" title="${client.clientNr ? 'copy ' + client.clientNr : ''}" data-tooltip="Kundennummer" data-tooltip-position="right" data-toast="${client.clientNr} copied">
          					<i class="material-icons">filter_none</i>
          				</div>
                </div>

                <div class="client__name">
          				${client.name}
          			</div>

                <div class="client__username">
          				${client.username ? client.username : '-'}
          				<div class="client__username__copy list-btn copy ${client.username ? 'active' : 'disabled'}" data-clipboard-text="${client.username}" title="${client.username ? 'copy username' : ''}" data-tooltip="Login" data-tooltip-position="right" data-toast="${client.username} copied">
          					<i class="material-icons">filter_none</i>
          				</div>
          			</div>

          			<div class="client__password">
          				${client.password ? client.password : '-'}
          				<div class="client__password__copy list-btn copy ${client.password ? 'active' : 'disabled'}" data-clipboard-text="${client.password}" title="${client.password ? 'copy password' : ''}" data-tooltip="Password" data-tooltip-position="left" data-toast="${client.password} copied">
          					<i class="material-icons">filter_none</i>
          				</div>
          			</div>

                <div class="client__url">
                  <a href="${client.url ? client.url : ''}" target="_blank" class="client__url__copy list-btn ${client.url ? 'active' : 'disabled'}" title="${client.url ? 'open URL' : ''}" data-tooltip="URL" data-tooltip-position="left">
                    <i class="material-icons">launch</i>
                  </a>
                </div>

                <div class="client__preview-url">
                  <a href="${client.devUrl ? client.devUrl : ''}" target="_blank" class="client__preview-url__copy list-btn ${client.devUrl ? 'active' : 'disabled'}" title="${client.devUrl ? 'open preview URL' : ''}" data-tooltip="Preview URL" data-tooltip-position="left">
                    <i class="material-icons">launch</i>
                  </a>
                </div>
          		</li>`;

    list.append(el);
  });
}


fs.readFile('./client-passwords.json', 'utf8', (err, json) => {
  if (err) {
    console.error('File read failed. Trying example file. ', err)
    // return
    fs.readFile('./client-passwords-EXAMPLE.json', 'utf8', (err, json) => {
      if (err) {
        console.error('File read failed', err)
        return
      };
      try {
        const content = JSON.parse(json)
        const clients = content.clients
        fillList(clients)
      } catch (err) {
        console.error('Error parsing JSON string:', err)
      }
    })
    return
  }

  try {
    const content = JSON.parse(json)
    const clients = content.clients

    fillList(clients)

  } catch (err) {
    console.error('Error parsing JSON string:', err)
  }
})




/*
* Window Frame functions
*/
const remote = require('electron').remote;

const init = () => {
  $('.min-btn').on('click', e => {
    const window = remote.getCurrentWindow()
    window.minimize()
  })

  $('.max-btn').on('click', e => {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
      $('.max-btn').removeClass('maximize').addClass('unmaximize')
    } else {
      window.unmaximize()
      $('.max-btn').removeClass('unmaximize').addClass('maximize')
    }
  })

  $('.close-btn').on('click', e => {
    const window = remote.getCurrentWindow()
    window.close()
  })
}

$(document).ready(() => {
  init()
})





/*
* SEARCH
*/
const clearSearch = () => {
	$('#search').val('');
	$('.search__icon-clear').removeClass('show');
  $('.searchable').css('display', 'flex');
  $('#noresults').css('display', 'none');
  $('#search').focus();
}

const search = () => {
	let searchTerm = $('#search').val();
	console.log(searchTerm);
}

$('#search').on('keyup', function(e) {
	e.preventDefault();
	let input = $(this).val();

	let key = e.which;
	if (key === 13) {
		search();
	}

	// if (input != '') {
	// 	$('.search__icon-clear').addClass('show');
	// } else {
	// 	$('.search__icon-clear').removeClass('show');
	// }
});

$('.search__icon-clear').on('click', clearSearch);
$('.search__icon-search').on('click', search);
