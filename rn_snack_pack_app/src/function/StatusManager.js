class StatusManager {

    static getString(code) {
        switch (Number(code)) {
            case 0:
                return "Not Delivered";
            case 1:
                return "In Transit";
            case 2:
                return "Delivered";
            case 3:
                return "Cancelled";
            case 4:
                return "Damaged";
            case 5:
                return "Lost";
            case 6:
                return "Refunded";
            case 7:
                return "Not Refunded";
            default:
                return "Error";
        }
    }

    static getColor(code) {
        switch (Number(code)) {
            case 0:
                return "#4AF";
            case 1:
                return "#4AA";
            case 2:
                return "#4A4";
            case 3:
                return "#F44";
            case 4:
                return "#F80";
            case 5:
                return "#A4A";
            case 6:
                return "#FE4";
            case 7:
                return "#A40";
            default:
                return "#F00";
        }
    }

}

module.exports = StatusManager;