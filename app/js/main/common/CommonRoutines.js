app.factory('Factory_CommonRoutines', [CommonRoutines])

function CommonRoutines() {

    var oCommonRoutine = {
        FindItemInArray: function (array, keyName, keyVal, returnType) {
            if (undefined === keyVal || null === keyVal) {
                return null;
            }
            var bFound = false;
            for (var i in array) {
                if (array[i][keyName] === keyVal) {
                    bFound = true;
                    break;
                }
            }
            if(bFound){
                if (returnType === "index") {
                    return i;
                } else {
                    return array[i];
                }
            }else{
                return null;
            }
        },
        ConvertDateToString: function (date) {
            return date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
        },
        Log: function (msg, color) {
            color = color || "black";
            bgc = "White";
            switch (color) {
                case "success": color = "Green"; bgc = "LimeGreen"; break;
                case "info": color = "DodgerBlue"; bgc = "Turquoise"; break;
                case "error": color = "Red"; bgc = "Black"; break;
                case "start": color = "OliveDrab"; bgc = "PaleGreen"; break;
                case "warning": color = "Tomato"; bgc = "Black"; break;
                case "end": color = "Orchid"; bgc = "MediumVioletRed"; break;
                default: color = color;
            }

            if (typeof msg == "object") {
                console.log(msg);
            } else if (typeof color == "object") {
                console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
                console.log(color);
            } else {
                console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
            }
        },
        Popup: {
            bShow: false,
            sType: null,
            sTitle: null,
            ShowPopup: function (bShow, sType, sTitle) {
                this.bShow = bShow;
                this.sType = sType;
                this.sTitle = sTitle;
            }
        }
    }

    return oCommonRoutine;
}