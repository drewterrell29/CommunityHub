/**
 * 
 */

var lock = new Auth0Lock('ftlfyVtH7MhlRdRbAo5BkylCrWwaCe1r', 'communityhub.auth0.com');
var userProfile = null;

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ authParams: { scope: 'openid' } });
});

var hash = lock.parseHash(window.location.hash);

if (hash && hash.id_token) {
  //save the token in the session:
  localStorage.setItem('id_token', hash.id_token);
}

if (hash && hash.error) {
  alert('There was an error: ' + hash.error + '\n' + hash.error_description);
}

//retrieve the profile:
var id_token = localStorage.get('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error geting the profile: ' + err.message);
    }
    document.getElementById('name').textContent = profile.name;
  });
}

var getFoos = fetch('/api/foo', {
	  headers: {
	    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
	  },
	  method: 'GET',
	  cache: false
	});

	getFoos.then(function (response) {
	  response.json().then(function (foos) {
	    console.log('the foos:', foos);
	  });
	});