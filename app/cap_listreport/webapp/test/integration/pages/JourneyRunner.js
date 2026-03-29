sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"caplistreport/test/integration/pages/StudentsList",
	"caplistreport/test/integration/pages/StudentsObjectPage"
], function (JourneyRunner, StudentsList, StudentsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('caplistreport') + '/test/flp.html#app-preview',
        pages: {
			onTheStudentsList: StudentsList,
			onTheStudentsObjectPage: StudentsObjectPage
        },
        async: true
    });

    return runner;
});

