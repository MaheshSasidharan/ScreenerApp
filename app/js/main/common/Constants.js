app.factory('Factory_Constants', [Constants])

function Constants() {
    var oConstants = {
        Miscellaneous: {
            LoadSuccessful: "{0} : Loaded successfully",
            SomethingWentWrong: "Sorry. Something went wrong.",
            InvalidDate: "Invalid Date",
            DeletedItem: "Successfully deleted item.",
            Notification: {
                Saved: "Item Saved successfully",
                Edited: "Item Updated successfully",
                Deleted: "Item Deleted successfully",
                Removed: "Item has been removed",
                Type: {
                    Info: 'Info',
                    Danger: 'Danger',
                    Warning: 'Warning'
                }
            }
        },
        Assessments: {
        }        
    }
    return oConstants;
}