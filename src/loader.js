if (document.location.href.includes('projects')) {
	function styleIssue(data, n) {
		if (!n) {
		} else {
			const project = document.querySelector(
				`[href="${document.location.href.split('projects')[0].split('.com')[1] + 'projects/'}${n}"]`
			);
			inject = document.createElement('a');
			count = data.split('<span class="js-column-nav-name" itemprop="name">').length - 1;
			var a = '';
			for (i = 1; i < count; i++) {
				if (data.split('<span class="js-column-nav-name" itemprop="name">')[i].split('</span>')[0] != 'Done') {
					a +=
						' ' +
						(data.split('<span class="js-column-nav-name" itemprop="name">')[i].split('</span>')[0] +
							':' +
							'<b>' +
							data
								.split('<span class="js-column-nav-name" itemprop="name">')
								[i].split('</span>')[1]
								.split('>')[1]) +
						'</b>' +
						' | ';
				} else {
				}
			}
			inject.innerHTML = ` ${a.substring(0,a.length-2)}`;
			inject.className = 'Label Label--outline v-align-middle mr-1 mb-1';
			inject.style.marginLeft = '.2rem';
			project.append(inject);
		}
	}

	function github() {
		arr = Array.from(document.querySelectorAll('.link-gray-dark')).map(a => {
			return a.attributes[0].value.split(
				document.location.href.split('projects')[0].split('.com')[1] + 'projects/'
			)[1];
		});

		arr.map(n => {
			if (!n) {
			} else {
				fetch(`${document.location.href.split('projects')[0] + 'projects'}/${n}`).then(function(response) {
					var data = response.text().then(function(res) {
						return res;
					});
					data.then(d => {
						return (data = `${d}`);
					}).then(run => this.styleIssue(data, n));
				});
			}
		});
	}
	window.github();
} else {
	var a = fetch(`${document.location.href.split('?')[0].split('issues')[0] + 'projects'}`).then(function(response) {
		var projectsData = response.text().then(function(res) {
			return res;
		});
		projectsData
			.then(d => {
				return (projectsData = `${d}`);
			})
			.then(
				run =>
					(a = projectsData.split(`<h4 class="mb-1">`).map(a => {
						if (a.split(`" class="link-gray-dark mr-1">`)[1] != undefined) {
							return [
								a.split(`" class="link-gray-dark mr-1">`)[1].split('</a>')[0],
								a.split(`" class="link-gray-dark mr-1">`)[0].split('projects/')[1],
							];
						}
					}))
			);
	});

	function styleIssue(data, n) {
		var h3 = document.createElement('a');
		h3.className = 'issues_project';
		count = 0;

		data.split('160px;')
			.map(a => {
				return a.split('>')[1];
			})
			.map(a => {
				if (a.includes('</span')) {
					return count++;
				}
			});

		if (count === 1) {
			res = data
				.split('160px;')[1]
				.split('>')[1]
				.split('</span')[0];
			var def = document.getElementById(`issue_${n}_link`).innerHTML;
			let num;
			a.forEach(a => {
				if (a == undefined) {
				} else if (a[0] == res) {
					num = a[1];
				}
			});
			var href =
				document.location.href.split('?')[0] +
				'?q=is%3Aopen+is%3Aissue+project%3A' +
				document.location.href.split('?')[0].split('/')[3] +
				'%2F' +
				document.location.href.split('?')[0].split('/')[4] +
				'%2F' +
				`${num}`;
			document.getElementById(
				`issue_${n}_link`
			).innerHTML = `[<a class="link-gray-dark v-align-middle no-underline h4 js-navigation-open" href=${href}>${res}</a>] ${def}`;
		} else if (count > 1) {
			for (var i = 1; i < count + 1; i++) {
				res = data
					.split('160px;')
					[i].split('>')[1]
					.split('</span')[0];
				var def = document.getElementById(`issue_${n}_link`).innerHTML;
				let num;
				a.forEach(a => {
					if (a == undefined) {
					} else if (a[0] == res) {
						num = a[1];
					}
				});
				var href =
					document.location.href.split('?')[0] +
					'?q=is%3Aopen+is%3Aissue+project%3A' +
					document.location.href.split('?')[0].split('/')[3] +
					'%2F' +
					document.location.href.split('?')[0].split('/')[4] +
					'%2F' +
					`${num}`;
				document.getElementById(
					`issue_${n}_link`
				).innerHTML = `[<a class="link-gray-dark v-align-middle no-underline h4 js-navigation-open" href=${href}>${res}</a>] ${def}`;
			}
		}
	}

	function github() {
		arr = Array.from(document.querySelectorAll('.Box-row')).map(a => {
			if (a.innerText.split('#')[1] != undefined) {
				return a.innerText.split('#')[1].split(' ')[0];
			}
		});

		if (document.location.href.includes('labels')) {
			arr.map(n => {
				fetch(`${document.location.href.split('labels')[0] + 'issues'}/${n}`).then(function(response) {
					var data = response.text().then(function(res) {
						return res;
					});
					data.then(d => {
						return (data = `${d}`);
					}).then(run => this.styleIssue(data, n));
				});
			});
		} else {
			arr.map(n => {
				fetch(`${document.location.href.split('issues')[0] + 'issues'}/${n}`).then(function(response) {
					var data = response.text().then(function(res) {
						return res;
					});
					data.then(d => {
						return (data = `${d}`);
					}).then(run => this.styleIssue(data, n));
				});
			});
		}
	}
	window.github();
}
