window.onload = function() {

    var checkboxes = document.getElementById("checksId");
    var checks = checkboxes.getElementsByTagName("input");
    for (var i = 0; i < checks.length; i++) {
        checks[i].onclick = function() {
            for (var i = 0; i < checks.length; i++) {
                if (checks[i] != this && this.checked) {
                    checks[i].checked = false;
                }
            }
        };
    }
};