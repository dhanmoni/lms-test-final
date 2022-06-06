// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LeaveApplication {

    struct Application { 
        string subject;
        string reason;
        uint startDate;
        uint endDate;
        address[] approvels;
        uint approveLevel;
        // check if the leave is academic or hostel leave, if true, 
        // leave is forwarded to onl HoD
        bool academicLeave; 
        // if the leave is for more than 3 days, this will be true
        // and leave will be forwared to DSW.
        bool dswReq;
        bool withDrawn;
        uint prefixDate;
        string prefixReason;
        uint suffixDate;
        string suffixReason;
    }

    address system_admin;
    mapping (address => bool) public AdminList;
    mapping (address => Application[]) public ApplicationRegistry;

    constructor() {
        system_admin = msg.sender;
        AdminList[system_admin] = true;
    }

   
    function applyLeave(string memory _sub, 
        string memory _reason, 
        uint _startDate, 
        uint _endDate, 
        bool _academicLeave, 
        bool _dswReq, 
        uint _prefixDate, 
        string memory _prefixReason, 
        uint _suffixDate, 
        string memory _suffixReason) public {
        Application memory _app = Application({
            subject: _sub, 
            reason: _reason, 
            startDate: _startDate, 
            endDate: _endDate,
            approvels: new address[] (0),
            approveLevel: 1,
            academicLeave: _academicLeave,
            dswReq: _dswReq,
            withDrawn: false,
            prefixDate: _prefixDate,
            prefixReason: _prefixReason,
            suffixDate: _suffixDate,
            suffixReason: _suffixReason
        });
        
        ApplicationRegistry[msg.sender].push(_app);
    }


    function makeAdmin(address _admin) public {
        require(msg.sender == system_admin, "makeAdmin: Unpriviledged");
        AdminList[_admin] = true;
    }

    function grantLeave(address _key) public {
        require(AdminList[msg.sender], "grantLeave: Unpriviledged");
        uint applicationIndex = _getTotalApplicationOfStudent(_key) - 1;
        require(ApplicationRegistry[_key][applicationIndex].approveLevel > 0, "grantLeave: Already rejected");
        require(ApplicationRegistry[_key][applicationIndex].withDrawn == false, "grantLeave: Already withdrawn");
        ApplicationRegistry[_key][applicationIndex].approvels.push(msg.sender);
        ApplicationRegistry[_key][applicationIndex].approveLevel++;
    }

    function rejectLeave(address _key) public {
        require(AdminList[msg.sender], "rejectLeave: Unpriviledged");
        uint applicationIndex = _getTotalApplicationOfStudent(_key) - 1;
        require(ApplicationRegistry[_key][applicationIndex].approveLevel > 0, "rejectLeave: Already rejected");
        require(ApplicationRegistry[_key][applicationIndex].withDrawn == false, "rejectLeave: Already withdrawn");
        ApplicationRegistry[_key][applicationIndex].approvels.push(msg.sender);
        ApplicationRegistry[_key][applicationIndex].approveLevel = 0;
    }

    function withDrawLeave(address _key) public {
        uint applicationIndex = _getTotalApplicationOfStudent(_key) - 1;
        require(ApplicationRegistry[_key][applicationIndex].approveLevel > 0, "grantLeave: Already rejected");
        ApplicationRegistry[_key][applicationIndex].withDrawn = true;
    }

    function getApplicationsByStudentId(address key) public view returns (Application[] memory) {
        return (ApplicationRegistry[key]);
    }

    function _getTotalApplicationOfStudent(address key) private view returns (uint){
        return ApplicationRegistry[key].length;
    }

}