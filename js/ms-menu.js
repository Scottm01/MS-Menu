/*
    Project Name: Multi-Level Responsive Mobile Menu
    Author: Matthew Scott
    Version: 1.0.5
    Description: A fully responsive mobile menu navigation. Allows for multiple Sub Pages, these act as a dropdown on hover for Desktops and as a Plus & Mins toggle for Mobile Devices.
    License: GNU General Public License v2 or later
    License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

$.fn.msOptions = function(options) {
        
    // Some of these settings can be changed to adapt it to your website
    var msMenu = $(this), settings = $.extend({
        websiteName: 'Matt Scott', // Change the name of your website
        menu: 'Menu',
        format: 'dropdown',
        logo: '<img class="mobile-logo" src="logo.png" />', // Change the "src" to where your logo is located
        darkMode: false, // Light and Dark modes available. Default is Light, change to true for Dark Mode
        sticky: true // Defaults to true, if you don't want the Menu to stay at the top after scrolling change to false
    }, options);
    
    return this.each(function() {
        // Choose whether to Display "Menu" your Website Name or a Logo on the Menu Bar by choosing one of the settings above. Defaults to logo. 
        msMenu.prepend('<div class="menu-btn">' + settings.logo + '</div>');

        $(this).find('.menu-btn').on('click', function(){
            $(this).toggleClass('menu-opened');
            var msMain = $(this).next('ul');
            if(msMain.hasClass('open')) { 
                msMain.hide().removeClass('open');
            }
            else {
                msMain.show().addClass('open');
                if(settings.format === 'dropdown') {
                    msMain.find('ul').show();
                }
            }
        });
    
        msMenu.find('li ul').parent().addClass('has-sub');
    
        multiTog = function() {
            msMenu.find('.has-sub').prepend('<span class="sub-btn"></span>');
            msMenu.find('.sub-btn').on('click', function() {
                $(this).toggleClass('sub-open');
                if($(this).siblings('ul').hasClass('open')) {
                       $(this).siblings('ul').removeClass('open').hide();
                }
                else {
                    $(this).siblings('ul').addClass('open').show();
                }
            });
        };
        
        if(settings.format === 'multitoggle') multiTog();
        else msMenu.addClass('dropdown');
    
        if(settings.darkMode === true) {
            msMenu.addClass('dark-mode');
        }

        if(settings.sticky === true) {
            msMenu.addClass('sticky');
        }
    
        resizeFix = function() {
            if($( window ).width() > 768) {
                msMenu.find('ul').show();
            }
        
            if($(window).width() <= 768) {
                msMenu.find('ul').hide().removeClass('open');
            }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);
    
    });
};

$(document).ready(function() {
    $(".ms-menu").msOptions({
        title: "Menu",
        format: "multitoggle"
    });
});