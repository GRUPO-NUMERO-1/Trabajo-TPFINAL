/* globals $, Tour */

const redirectsTour = new Tour({
    name: "redirects"
});

redirectsTour.addSteps([{
    title: "A10 Redirects",
    content: "Contents here",
    orphan: true
}, {
    element: "#learn-menu-link",
    title: "Title of my popover1",
    content: "Content of my popover1"
}, {
    element: "#profile-menu-link",
    title: "Title of my popover",
    content: "Content of my popover"
}, {
    element: "#logout-menu-link",
    title: "Title of my popover lo",
    content: "Content of my popover oi"
}]);

$("#redirects-tour").on("click", () => {
    "use strict";
    // Validar y autorizar la URL antes de la redirección
    const destinationURL = getAuthorizedDestinationURL();
    
    // Utilizar un valor de mapeo en lugar de la URL directa
    redirectsTour.addSteps([{
        element: "#redirects-tour",
        title: "Redirect Tour",
        content: "You will be redirected to the tour.",
        onNext: function() {
            window.location.href = destinationURL;
        }
    }]);

    redirectsTour.init();
    redirectsTour.restart();
});


