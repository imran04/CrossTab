/////////////////////////////////////////////////////
///            Author : Imran Ali                 ///
///                                               ///
/////////////////////////////////////////////////////
/****************************************************
              Dependency string.js
To add element accross tabs.
Uses localStorage.
behaviour can be binded through callback function.
Under GPL licence
no guarantee
*/
(function( $ ) {
    $.fn.Chat = function (options) {
    
        var defaults = {
            //html Structure
            tab:"<li><button class='remove' data-id='{0}'> {1}  --x</button></li>",
            key:"Users",
            sel: '.holder',
            tabname: "Sync",
            tabstart: 0,
            callback:function(){}
        };
        var options = $.extend({}, defaults, options); 
        var users = [];
        var tab = options.tab;
        var browsersync = options.tabstart;
        var broswerId = options.tabname;
        var total = 1;
        return {
            addUser: addUser,
            PopObject: PopObject,
            RemoveObject: RemoveObject,
            getAll: getAll,
            changeState: changeState,
            getState: getState,
            resetTabs: resetTabs,
            Setup: Setup
        }
        //add user
        function addUser(user) {
            users = JSON.parse(localStorage.getItem(options.key));
            users.push(user);
            localStorage.setItem(options.key, JSON.stringify(users));
            resetTabs();
        }
        function PopObject() {
            users = JSON.parse(localStorage.getItem(options.key));
            users.pop();
            localStorage.setItem(options.key, JSON.stringify(users));
            resetTabs();
        };
        function RemoveObject(id) {
            users = JSON.parse(localStorage.getItem(options.key));
            for (var i = users.length - 1; i >= 0; i--)
                if (users[i].id == id)
                    users.splice(i, 1);
            localStorage.setItem(options.key, JSON.stringify(users));
            resetTabs();
        }  
        function getAll() {
            $(options.sel).html("");
            users = JSON.parse(localStorage.getItem(options.key));
            for (var i = users.length - 1; i >= 0; i--) {
                $(options.sel).append(String.format(tab, users[i].id, users[i].name));
            }
            // $(sel).append('<br>' + users[i].name)
        }
        function changeState(newState) {
            var items = localStorage.getItem(broswerId + browsersync);
            if (items === undefined || items === null || items.length === 0) {
                localStorage.setItem(broswerId + browsersync, newState);
            }
            else
                localStorage.setItem(broswerId + browsersync, newState);
        }
        function getState() {
            return parseInt(localStorage.getItem(broswerId + browsersync));
        }
        function resetTabs() {
            total = parseInt(localStorage.getItem(options.tabname));
            for (var io = 0; io <= total; io++) {
                console.log("t" + io +"--"+total);
                var items = localStorage.getItem(broswerId + io);
                if (items === undefined || items === null || items.length === 0) {
                    continue;
                }
                else
                    localStorage.setItem(broswerId + io, 0);
            }
        }
        function Setup() {
            console.log(options.sel)
            var items = localStorage.getItem(options.tabname);
            if (items === undefined || items === null || items.length === 0) {
                localStorage.setItem(options.tabname, 0);
                changeState(0);
                total = 0;
            }
            else {
                browsersync = localStorage.getItem(options.tabname);
                browsersync++;
                localStorage.setItem(options.tabname, browsersync);
                changeState(0);
                total = items;
            }
            if (localStorage.Users === undefined) {
                localStorage.setItem(options.key, JSON.stringify(users));
            }
            setInterval(function () {
                total = parseInt(localStorage.getItem(options.tabname));
                if (getState() === 0) {
                    changeState(1);
                    getAll();
                    options.callback()
                }
            }, 200);
            window.onbeforeunload = function () {
                localStorage.removeItem(broswerId + browsersync);
            }
        }
   
    }
}(jQuery))
$(function () {
    var i = 1, o = { callback: b };
    $('.holder').Chat(o).Setup();
    $("#add").click(function () {
        var us = $("#name").val();
        var ob = { id: i, name: us };
        $('.holder').Chat(o).addUser(ob);
        i++;
    });
    $("#remove").click(function () {

    //    var us = $("#name").val();

    //    RemoveObject({ name: us }, "Users");
    //    getAll(".holder", "Users");
       
        $('.holder').Chat(o).PopObject();

    });
    function b() {
        $(".remove").unbind("click");
        $(".remove").click(function () {
            var us = $(this).data("id");
            $('.holder').Chat(o).RemoveObject(us);
            //RemoveObjectById(us, "Users");
            //getAll(".holder", "Users");
            //for (var io = 0; io <= total; io++) {
            //    var items = localStorage.getItem(broswerId + io);
            //    if (items === undefined || items === null || items.length === 0) {
            //        console.log("Opps")
            //    }
            //    else
            //        localStorage.setItem(broswerId + io, 0);
            //}


        });
    }
    $("#Print").click(function () {
        $('.holder').Chat(o).getAll();

    });
   
});
