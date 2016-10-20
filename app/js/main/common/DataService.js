app.factory('Factory_DataService', ['$http', 'Factory_Constants', 'Factory_CommonRoutines', DataService])

function DataService($http, Constants, CommonFactory) {
    var Helper = {
        app: "http://localhost:3000/",
        Users: {
            controller: "users/",
            GetCurrentUsers: function () {                
                return $http.get(Helper.app + Helper.Users.controller + 'test')
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            }
        },
        Assessments: {
            controller: "assessments/",
            GetAssessments: function () {
                return $http.get(Helper.app + Helper.Assessments.controller + 'GetAssessments')
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SaveAssessments: function(oSaveItem){
              return $http.post(Helper.app + Helper.Assessments.controller + 'SaveAssessments', { oSaveItem: oSaveItem})
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)  
            },
            AudioUpload: function(oSaveItem){
              return $http.post(Helper.app + Helper.Assessments.controller + 'audioUpload', { oSaveItem: oSaveItem })
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)  
            },
        },
        Miscellaneous: {
            ReturnDataDotData: function (data) {
                return data.data;
            },
            FailedInService: function () {
                Notification.ShowNotification(true, Constants.Miscellaneous.SomethingWentWrong, Constants.Miscellaneous.Notification.Type.Danger);
            }
        }
    }

    var oService = {
        GetCurrentUsers: Helper.Users.GetCurrentUsers,
        GetAssessments: Helper.Assessments.GetAssessments,
        SaveAssessments: Helper.Assessments.SaveAssessments,
        AudioUpload: Helper.Assessments.AudioUpload
    }
    return oService;
}