function tamingselect()
{
	if(!document.getElementById && !document.createTextNode){return;}
	
// Classes for the link and the visible dropdown
	// var ts_selectclass='turnintodropdown'; 	// class to identify selects
	var ts_listclass='turnintoselect';		// class to identify ULs
	var ts_boxclass='dropcontainer'; 		// parent element
	var ts_triggeron='activetrigger'; 		// class for the active trigger link
	var ts_triggeroff='trigger';			// class for the inactive trigger link
	var ts_dropdownclosed='dropdownhidden'; // closed dropdown
	var ts_dropdownopen='dropdownvisible';	// open dropdown

	var count=0;
	var toreplace=[];
	// var sels=document.getElementsByTagName('select');

	var select_dropdown=document.getElementById('select-dropdown');

	var hiddenfield=document.createElement('input');
	hiddenfield.name=select_dropdown.name;
	hiddenfield.type='hidden';
	hiddenfield.id=select_dropdown.id;
	hiddenfield.value=select_dropdown.options[0].value;
	select_dropdown.parentNode.insertBefore(hiddenfield,select_dropdown);

	var trigger=document.createElement('a');
	ts_addclass(trigger,ts_triggeroff);
	trigger.href='#state';

	// var zipcode=document.getElementById('zipcode-div');

	trigger.onclick=function(){
		ts_swapclass(this,ts_triggeroff,ts_triggeron);
		ts_swapclass(this.parentNode.getElementsByTagName('ul')[0],ts_dropdownclosed,ts_dropdownopen);
		return false;
	};

	trigger.appendChild(document.createTextNode(select_dropdown.options[0].text));
	select_dropdown.parentNode.insertBefore(trigger,select_dropdown);
	var replaceUL=document.createElement('ul');
	for(var j=0;j<select_dropdown.getElementsByTagName('option').length;j++)
	{
		var newli=document.createElement('li');
		var newa=document.createElement('a');
		newli.v=select_dropdown.getElementsByTagName('option')[j].value;
		newli.elm=hiddenfield;
		newli.istrigger=trigger;
		newa.href='#';
		newa.appendChild(document.createTextNode(
		select_dropdown.getElementsByTagName('option')[j].text));
    /*jshint loopfunc: true */
		newli.onclick=function(){ 
			this.elm.value=this.v;
			ts_swapclass(this.istrigger,ts_triggeron,ts_triggeroff);
			ts_swapclass(this.parentNode,ts_dropdownopen,ts_dropdownclosed);
			this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue;
			return false;
		};
		newli.appendChild(newa);
		replaceUL.appendChild(newli);
	}
	ts_addclass(replaceUL,ts_dropdownclosed);
	var div=document.createElement('div');
	div.appendChild(replaceUL);
	ts_addclass(div,ts_boxclass);
	select_dropdown.parentNode.insertBefore(div,select_dropdown);

	var uls=document.getElementsByTagName('ul');
	for(var i=0;i<uls.length;i++)
	{
		if(ts_check(uls[i],ts_listclass))
		{
			var newform=document.createElement('form');
			var newselect=document.createElement('select');
			for(j=0;j<uls[i].getElementsByTagName('a').length;j++)
			{
				var newopt=document.createElement('option');
				newopt.value=uls[i].getElementsByTagName('a')[j].href;	
				newopt.appendChild(document.createTextNode(uls[i].getElementsByTagName('a')[j].innerHTML));	
				newselect.appendChild(newopt);
			}
			newselect.onchange=function()
			{
				window.location=this.options[this.selectedIndex].value;
			};
			newform.appendChild(newselect);
			uls[i].parentNode.insertBefore(newform,uls[i]);
			toreplace[count]=uls[i];
			count++;
		}
	}

	select_dropdown.parentNode.removeChild(select_dropdown);

	function ts_check(o,c)
	{
	 	return new RegExp('\\b'+c+'\\b').test(o.className);
	}
	function ts_swapclass(o,c1,c2)
	{
		var cn=o.className;
		o.className=!ts_check(o,c1)?cn.replace(c2,c1):cn.replace(c1,c2);
	}
	function ts_addclass(o,c)
	{
		if(!ts_check(o,c)){o.className+=o.className===''?c:' '+c;}
	}
}

function update_checkmark(grandparent_div) {
	var related_check = grandparent_div.firstElementChild.children[0];
	var related_bg = grandparent_div.firstElementChild.children[1];
	var related_input = grandparent_div.children[1];

	if (related_input.checked === true) {
	  for (var i = 0; i < related_check.children.length; i++) {
	  	related_check.children[i].classList.add("ch-flipped");
	  	related_check.children[i].classList.remove("ch-normal");
	  }
	  related_bg.classList.add("bg-flipped");
	  related_bg.classList.remove("bg-normal");
	} else {
    /* jshint shadow:true */
	  for (var i = 0; i < related_check.children.length; i++) {
	  	related_check.children[i].classList.add("ch-normal");
	  	related_check.children[i].classList.remove("ch-flipped");
	  }
	  related_bg.classList.add("bg-normal");
	  related_bg.classList.remove("bg-flipped");
	}

}

function custom_checkbox() 
{

	// bind function to make correct state on click
	var checkbox_icons = document.getElementsByClassName("hidden-checkbox-icon");
	for (var i = 0; i < checkbox_icons.length; i++) {
		checkbox_icons[i].style.opacity=0;
		checkbox_icons[i].style.marginLeft="-25px";
    /*jshint loopfunc: true */
		checkbox_icons[i].onclick = function() {
			for (var j = 0; j < checkbox_icons.length; j++) {
				update_checkmark(checkbox_icons[j].parentNode);
			}
		};
	}

	// make correct state at the beginning
	for (var j = 0; j < checkbox_icons.length; j++) {
		update_checkmark(checkbox_icons[j].parentNode);
	}

	// unhide check-containers
	var check_containers = document.getElementsByClassName("check-container");
  /* jshint shadow:true */
	for (var i = 0; i < check_containers.length; i++) {

		check_containers[i].style.display="inline";
	}
}


function update_dot(grandparent_div) {
	var related_dot = grandparent_div.children[0].children[0];
	var related_bg = grandparent_div.children[0].children[1];
	var related_input = grandparent_div.children[1];
	if (related_input.checked === true) {
	  related_dot.classList.add("d-flipped");
	  related_dot.classList.remove("d-normal");
	  related_bg.classList.add("bg-flipped");
	  related_bg.classList.remove("bg-normal");
	} else {
	  related_dot.classList.add("d-normal");
	  related_dot.classList.remove("d-flipped");
	  related_bg.classList.add("bg-normal");
	  related_bg.classList.remove("bg-flipped");
	}

}

function custom_radio_button() 
{
	
	// bind function to make correct state on click
	var radio_bttn_icons = document.getElementsByClassName("hidden-rbutton-icon");

	for (i = 0; i < radio_bttn_icons.length; i++) {
		radio_bttn_icons[i].style.opacity=0;
		radio_bttn_icons[i].style.marginLeft="-25px";
    /*jshint loopfunc: true */
		radio_bttn_icons[i].onclick = function() {
			for (var j = 0; j < radio_bttn_icons.length; j++) {
				update_dot(radio_bttn_icons[j].parentNode);
			}
		};
	}

	// make correct state at the beginning
	for (var j = 0; j < radio_bttn_icons.length; j++) {
		update_dot(radio_bttn_icons[j].parentNode);
	}

	// unhide dot containers

	var dot_containers = document.getElementsByClassName("dot-container");
	
  for (var i = 0; i < dot_containers.length; i++) {

		dot_containers[i].style.display="inline";
	}
}

window.onload=function()
{
	tamingselect();
	custom_checkbox();
	custom_radio_button();
};
