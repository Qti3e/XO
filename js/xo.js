/*****************************************************************************
 *         In the name of God the Most Beneficent the Most Merciful          *
 *___________________________________________________________________________*
 *   This program is free software: you can redistribute it and/or modify    *
 *   it under the terms of the GNU General Public License as published by    *
 *   the Free Software Foundation, either version 3 of the License, or       *
 *   (at your option) any later version.                                     *
 *___________________________________________________________________________*
 *   This program is distributed in the hope that it will be useful,         *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           *
 *   GNU General Public License for more details.                            *
 *___________________________________________________________________________*
 *   You should have received a copy of the GNU General Public License       *
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.   *
 *___________________________________________________________________________*
 *                             Created by  Qti3e                             *
 *        <http://Qti3e.Github.io>    LO-VE    <Qti3eQti3e@Gmail.com>        *
 *****************************************************************************/
var client,bot,finish;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
if(getRandomInt(1,6) % 2 == 0){
    client  = 'a-x';
    bot     = 'a-o';
}else{
    client  = 'a-o';
    bot     = 'a-x';
}
if(localStorage['xo_equal'] == undefined){
    localStorage['xo_equal']    = 0;
}
if(localStorage['xo_score'] == undefined){
    localStorage['xo_score']    = 0;
}
$('#status_equals b').text(localStorage['xo_equal']);
var p = '+';
if(localStorage['xo_score'] < 0){
    $('#status_score b').css('color','#ff233c');
    p   = '';
}else{
    $('#status_score b').css('color','#81ff61');
}
$('#status_score b').text(p+localStorage['xo_score']);
var lock    = false;
$("#client").addClass(client);

function ch0(i1,i2){
    return (gss(i1) == gss(i2)) && (gss(i1) !== 1);
}
function ch1(i1,i2){
    if(gss(i1) + gss(i2) == 4){
        return 100;
    }
    return gss(i1) + gss(i2);
}
function choose(){
    //For ch 0
    if(finish){
        return;
    }
    //For I1
    if(gss(1) === 1){
        if(ch0(2,3) || ch0(4,7) || ch0(5,9)){
            return 1;
        }
    }
    //For I2
    if(gss(2) === 1){
        if(ch0(1,3) || ch0(5,8)){
            return 2;
        }
    }
    //For I3
    if(gss(3) === 1){
        if(ch0(1,2) || ch0(6,9) || ch0(5,7)){
            return 3;
        }
    }
    //For I4
    if(gss(4) === 1){
        if(ch0(1,7) || ch0(5,6)){
            return 4;
        }
    }
    //For I5
    if(gss(5) === 1){
        if(ch0(2,8) || ch0(4,6) || ch0(1,9) || ch0(7,3)){
            return 5;
        }
    }
    //For I6
    if(gss(6) === 1){
        if(ch0(5,4) || ch0(3,9)){
            return 6;
        }
    }
    //For I7
    if(gss(7) === 1){
        if(ch0(5,3) || ch0(1,4) || ch0(8,9)){
            return 7;
        }
    }
    //For I8
    if(gss(8) === 1){
        if(ch0(2,5) || ch0(7,9)){
            return 8;
        }
    }
    //For I9
    if(gss(9) === 1){
        if(ch0(7,8) || ch0(1,5) || ch0(3,6)){
            return 9;
        }
    }

    //</End of CH0
    var re  = Object();
    if(gss(1) === 1){
        re.i1   = ch1(2,3) + ch1(5,9) + ch1(4,7);
    }
    if(gss(2) === 1){
        re.i2   = ch1(1,3) + ch1(5,8);
    }
    if(gss(3) === 1){
        re.i3   = ch1(1,2) + ch1(6,9) + ch1(5,7);
    }
    if(gss(4) === 1){
        re.i4   = ch1(1,7) + ch1(5,6);
    }
    if(gss(5) === 1){
        re.i5   = ch1(2,8) + ch1(4,6) + ch1(1,9) + ch1(7,3);
    }
    if(gss(6) === 1){
        re.i6   = ch1(5,4) + ch1(3,9);
    }
    if(gss(7) === 1){
        re.i7   = ch1(5,3) + ch1(1,4) + ch1(8,9);
    }
    if(gss(8) === 1){
        re.i8   = ch1(2,5) + ch1(7,9);
    }
    if(gss(9) === 1){
        re.i9   = ch1(7,8) + ch1(1,5) + ch1(3,6);
    }
    if(Object.keys(re).length == 0){
        $("#body").css('opacity','0.2');
        $("#equal").show('slow');
        localStorage['xo_score'] =100+parseInt(localStorage['xo_score']);
        lock    = true;
        finish  = true;
        return;
    }
    var sortable    = [];
    for(var key in re){
        sortable.push([key,re[key]]);
    }
    sortable.sort(function(a,b){
        return b[1] - a[1];
    });
    var max = -1;
    var last= sortable[0][1];
    for(var i = 0;i < sortable.length;i++){
        if(sortable[i][1] == last){
            max++;
        }
    }
    key     = (getRandomInt(1,max+1) - 1);
    re      = sortable[key][0];
    return re.substr(1);
}
function get_sq_score(id){
    switch ($("#s"+id).data('status')){
        case undefined:
            return 1;
        case 'client':
            return 2;
        case 'bot':
            return -2;
    }
    return false;
}
function gss(id){
    return get_sq_score(id);
}
function check(i1,i2,i3){
    var status  = '';//lose or win
    if((gss(i1) === gss(i2)) && (gss(i2) == gss(i3)) && (gss(i1) !== 1)){
        $('#s'+i1+',#s'+i2+',#s'+i3).addClass('win');
        if(gss(i1) == 2){
            status  = 'win';
        }else{
            status  = 'lose'
        }
    }
    if(status !== ''){
        lock    = true;
        $("#body").css('opacity','0.2');
        if(status == 'lose'){
            $("#you_lose").show('slow');
            localStorage['xo_score'] = parseInt(localStorage['xo_score']) - 100;
            finish  = true;
        }else{
            $("#you_win").show('slow');
            finish  = true;
            localStorage['xo_score'] = parseInt(localStorage['xo_score'])+1000;
        }
    }
}
function winner(){
    check(1,2,3);
    check(1,5,9);
    check(1,4,7);
    check(3,5,7);
    check(3,6,9);
    check(9,8,7);
    check(2,5,8);
    check(4,5,6);
}
$('#squares .sq').click(function(){
    if(lock){
        return;
    }
    var el  = $(this);
    if(el.data('status') === undefined){
        el.attr('data-status','client')
            .addClass(client);
        winner();
        lock = true;
        setTimeout(function () {
            $('#s'+choose()).attr('data-status','bot')
                .addClass(bot);
            winner();
            lock = false;
        },1500);
    }else{
        //alert('It\'s already selected.');
    }
});
$('.reload').click(function(){
    window.location.reload();
});
$('.about').click(function(){
    $('#about').toggle('slow');
});