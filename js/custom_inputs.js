function tamingselect()
{
	if(!document.getElementById && !document.createTextNode){return;}
	
// Classes for the link and the visible dropdown
	var ts_selectclass='turnintodropdown'; 	// class to identify selects
	var ts_listclass='turnintoselect';		// class to identify ULs
	var ts_boxclass='dropcontainer'; 		// parent element
	var ts_triggeron='activetrigger'; 		// class for the active trigger link
	var ts_triggeroff='trigger';			// class for the inactive trigger link
	var ts_dropdownclosed='dropdownhidden'; // closed dropdown
	var ts_dropdownopen='dropdownvisible';	// open dropdown
	var normal='contact-zipcode-normal';					// normal margin for zipcode
	var adjust='contact-zipcode-adjust';					// adjust so that dropdown doesn't displace zipcode

	var count=0;
	var toreplace=new Array();
	var sels=document.getElementsByTagName('select');

	var select_dropdown=document.getElementById('select-dropdown');

	var hiddenfield=document.createElement('input');
	hiddenfield.name=select_dropdown.name;
	hiddenfield.type='hidden';
	hiddenfield.id=select_dropdown.id;
	hiddenfield.value=select_dropdown.options[0].value;
	select_dropdown.parentNode.insertBefore(hiddenfield,select_dropdown)

	var trigger=document.createElement('a');
	ts_addclass(trigger,ts_triggeroff);
	trigger.href='#';

	var zipcode=document.getElementById('zipcode-div');

	trigger.onclick=function(){
		ts_swapclass(this,ts_triggeroff,ts_triggeron)
		ts_swapclass(this.parentNode.getElementsByTagName('ul')[0],ts_dropdownclosed,ts_dropdownopen);
		ts_swapclass(zipcode, normal, adjust);
		return false;
	}

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
		newli.onclick=function(){ 
			this.elm.value=this.v;
			ts_swapclass(this.istrigger,ts_triggeron,ts_triggeroff);
			ts_swapclass(this.parentNode,ts_dropdownopen,ts_dropdownclosed);
			ts_swapclass(zipcode, normal, adjust);
			this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue;
			return false;
		}
		newli.appendChild(newa);
		replaceUL.appendChild(newli);
	}
	ts_addclass(replaceUL,ts_dropdownclosed);
	var div=document.createElement('div');
	div.appendChild(replaceUL);
	ts_addclass(div,ts_boxclass);
	select_dropdown.parentNode.insertBefore(div,select_dropdown)

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
			}
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
		if(!ts_check(o,c)){o.className+=o.className==''?c:' '+c;}
	}
}

// function custom_checkbox() 
// {
// 	var hidden_inputs = document.getElementsByClassName("hidden-checkbox-icon");
// 	for (var i = 0; i < hidden_inputs.length; i++) {
// 		hidden_inputs[i].onclick = function() {
// 			var related_checkmark = this.parentNode.firstElementChild;
// 			if (this.checked == true) {
// 			  related_checkmark.classList.add("checked");
// 			} else {
// 			  related_checkmark.classList.remove("checked");
// 			}
			
// 		}
// 	}

// 	for (var i = 0; i < hidden_inputs.length; i++) {
// 		var related_checkmark = hidden_inputs[i].parentNode.firstElementChild;
// 			if (hidden_inputs[i].checked == true) {
// 			  related_checkmark.classList.add("checked");
// 			} else {
// 			  related_checkmark.classList.remove("checked");
// 			}
// 	}

// }


function update_checkmark(grandparent_div) {
	var related_check = grandparent_div.firstElementChild;
	var related_bg = grandparent_div.children[1];
	var related_input = grandparent_div.children[2];
	console.log(grandparent_div);
	console.log("related bg");
	console.log(related_bg);
	if (related_input.checked == true) {
	  for (var i = 0; i < related_check.children.length; i++) {
	  	related_check.children[i].classList.add("ch-flipped");
	  	related_check.children[i].classList.remove("ch-normal");
	  }
	  related_bg.classList.add("bg-flipped");
	  related_bg.classList.remove("bg-normal");
	} else {
	  for (var i = 0; i < related_check.children.length; i++) {
	  	related_check.children[i].classList.add("ch-normal");
	  	related_check.children[i].classList.remove("ch-flipped");
	  }
	  related_bg.classList.add("bg-normal");
	  related_bg.classList.remove("bg-flipped");
	}

}

function custom_checkbox2() 
{

	var checkbox_icons = document.getElementsByClassName("hidden-checkbox-icon");
	for (var i = 0; i < checkbox_icons.length; i++) {
		checkbox_icons[i].onclick = function() {
			for (var j = 0; j < checkbox_icons.length; j++) {
				update_checkmark(checkbox_icons[j].parentNode);
			}
		}
	}

	for (var j = 0; j < checkbox_icons.length; j++) {
		update_checkmark(checkbox_icons[j].parentNode);
	}
}


function update_dot(grandparent_div) {
	var related_dot = grandparent_div.children[0].children[0];
	var related_bg = grandparent_div.children[0].children[1];
	var related_input = grandparent_div.children[1];
	if (related_input.checked == true) {
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
	var radio_bttn_icons = document.getElementsByClassName("hidden-rbutton-icon");
	for (var i = 0; i < radio_bttn_icons.length; i++) {
		radio_bttn_icons[i].onclick = function() {
			for (var j = 0; j < radio_bttn_icons.length; j++) {
				update_dot(radio_bttn_icons[j].parentNode);
			}
		}
	}

	for (var j = 0; j < radio_bttn_icons.length; j++) {
		update_dot(radio_bttn_icons[j].parentNode);
	}
}

window.onload=function()
{
	tamingselect();
	// custom_checkbox();
	custom_checkbox2();
	custom_radio_button();
}