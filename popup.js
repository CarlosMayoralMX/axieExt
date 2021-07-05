
const optionsMapping = {
    enableOption: ENABLE_OPTION, 
    minimalOption: MINIMAL_OPTION, 
    showBreedsStats: SHOW_BREEDS_STATS_OPTION,
    eggParentOption: SHOW_EGG_PARENTS};

$(document).ready(function(){
    let options = Object.keys(optionsMapping);
    console.log("Got options...", optionsMapping);
    getOptions(function(response) {
        let storedOpts = response;
        if (Object.keys(storedOpts).length != options.length) {
            storedOpts = resetOptions();
        }
        for (let opt in optionsMapping) {
            //set UI
            if (storedOpts[optionsMapping[opt]]) {
                $("#" + opt).prop('checked', true);
            } else {
                $("#" + opt).prop('checked', false);
            }

            if (!storedOpts[ENABLE_OPTION] && opt != "enableOption") {
                $("#" + opt).prop('disabled', true);
            }

            //handle future changes
            if (opt == "enableOption") {
                $("#" + opt).click(function() {
                    if( $(this).is(':checked') ) {
                        putOption(optionsMapping[opt], true);
                        for (let opt in optionsMapping) {
                            $("#" + opt).prop('disabled', false);
                        }
                    } else {
                        putOption(optionsMapping[opt], false);
                        for (let opt in optionsMapping) {
                            $("#" + opt).prop('disabled', true);
                        }
                    }
                });
            } else {
                $("#" + opt).click(function() {
                    if( $(this).is(':checked') ) {
                        putOption(optionsMapping[opt], true);
                    } else {
                        putOption(optionsMapping[opt], false);
                    }
                });
            }
        }
    });
});
