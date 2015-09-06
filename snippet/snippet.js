/*

Search results:
https://www.linkedin.com/vsearch/pj?trk=federated_advs&rsid=690973491440407162057&orig=FCTD&f_FG=59008&openFacets=N,G,CC,FG&f_N=A&page_num=4&pt=people&rnd=1440407178595

data -> r.content.page.voltron_unified_search_json.search.results

---

Profile info:
https://touch.www.linkedin.com/li/v2/profile/23029516/detail/background

find in values array -> contextType: "experience1" && this.values find text1Link.type === "company"  -> id

---

Company about (domain):
https://touch.www.linkedin.com/li/v1/companies/966722/about

find in sections array -> website !== undefined -> url

---

Company info (extra data):
https://touch.www.linkedin.com/li/v2/companies/966722/page


 */


function fetchGroupMembers(groupId,pageNum) {

	// TODO
	// https://www.linkedin.com/mob/tracking POST tracking info

	$.ajax({
		url: "https://www.linkedin.com/vsearch/pj?trk=federated_advs&rsid=690973491440407162057&orig=FCTD&f_FG="+groupId+"&openFacets=N,G,CC,FG&f_N=A&page_num=" + pageNum + "&pt=people&rnd=1440407178595",
		method: "GET"
	}).success(function(r) {
		
		var results = r.content.page.voltron_unified_search_json.search.results;
		saveToCantrip(groupId,results);

		if (pageNum === 100) {
			return;
			console.log('finished');
		}

		console.log('page ' + pageNum + ' fetched');

		setTimeout(function() {
			fetchGroupMembers(groupId, ++pageNum);
		}, Math.floor(Math.random() * 5000 + 3000));
	})
}


function saveToCantrip(groupId,data) {
	for (var i = 0; i < data.length; i++) {
		(function(i) {

		data[i].grpupId = groupId;
		
		setTimeout(function() {

			$.ajax({
				url: "https://cantrip.kriek.io/linkedin/users",
				method: "POST",
				data: JSON.stringify(data[i]),
				contentType : "application/json"
			}).success(function(r) {
				console.log('Saved page data to cantrip');
			})
		}, 500 * i);

		})(i)
	}
}

fetchGroupMembers(59008,1);