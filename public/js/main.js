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
* Fill client list
*/
const fillList = clients => {
  const list = $('.client-list');

  clients.reverse();

  clients.forEach(client => {
    let el = `<li class="client searchable">
          			<div class="client__name">
          				${client.name}
          			</div>

                <div class="client__username">
          				${client.username ? client.username : '-'}
          				<div class="client__username__copy list-btn copy ${client.username ? 'active' : 'disabled'}" data-clipboard-text="${client.username}">
          					<i class="material-icons">filter_none</i>
          				</div>
          			</div>

          			<div class="client__password">
          				${client.password ? client.password : '-'}
          				<div class="client__password__copy list-btn copy ${client.password ? 'active' : 'disabled'}" data-clipboard-text="${client.password}">
          					<i class="material-icons">filter_none</i>
          				</div>
          			</div>

          			<a href="${client.url ? client.url : ''}" target="_blank" class="client__url list-btn ${client.url ? 'active' : 'disabled'}">
          				<i class="material-icons">launch</i>
          			</a>

          			<a href="${client.devUrl ? client.devUrl : ''}" target="_blank" class="client__preview-url list-btn ${client.devUrl ? 'active' : 'disabled'}">
          				<i class="material-icons">launch</i>
          			</a>
          		</li>`;

    list.append(el);
  })
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

	if (input != '') {
		$('.search__icon-clear').addClass('show');
	} else {
		$('.search__icon-clear').removeClass('show');
	}
});

$('.search__icon-clear').on('click', clearSearch);
$('.search__icon-search').on('click', search);
