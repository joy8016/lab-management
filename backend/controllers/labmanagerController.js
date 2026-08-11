import InventoryRequest from '../models/InventoryRequest.js';
import StaffRoster from '../models/StaffRoster.js';
import QualityControl from '../models/QualityControl.js';






// @desc    Get Inventory Purchase Requests
// @route   GET /api/labmanager/inventory-requests
export const getInventoryRequests = async (req, res) => {
  try {
    const requests = await InventoryRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests.map((r) => ({
        id: r.reqId || r._id.toString(),
        _id: r._id,
        item: r.item,
        qty: r.qty,
        requester: r.requester,
        status: r.status,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve Inventory Request
// @route   PUT /api/labmanager/inventory-requests/:id/approve
export const approveInventoryRequest = async (req, res) => {
  try {
    const { id } = req.params;
    let request = await InventoryRequest.findOne({ reqId: id });
    if (!request) {
      request = await InventoryRequest.findById(id);
    }
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    request.status = 'Approved';
    await request.save();

    res.status(200).json({
      success: true,
      message: 'Request approved successfully',
      data: {
        id: request.reqId || request._id.toString(),
        _id: request._id,
        item: request.item,
        qty: request.qty,
        requester: request.requester,
        status: request.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reject Inventory Request
// @route   PUT /api/labmanager/inventory-requests/:id/reject
export const rejectInventoryRequest = async (req, res) => {
  try {
    const { id } = req.params;
    let request = await InventoryRequest.findOne({ reqId: id });
    if (!request) {
      request = await InventoryRequest.findById(id);
    }
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    request.status = 'Rejected';
    await request.save();

    res.status(200).json({
      success: true,
      message: 'Request rejected successfully',
      data: {
        id: request.reqId || request._id.toString(),
        _id: request._id,
        item: request.item,
        qty: request.qty,
        requester: request.requester,
        status: request.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Staff Roster
// @route   GET /api/labmanager/roster
export const getRoster = async (req, res) => {
  try {
    const roster = await StaffRoster.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: roster.length,
      data: roster.map((r) => ({
        id: r._id.toString(),
        _id: r._id,
        name: r.name,
        dept: r.dept,
        shift: r.shift,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add Staff Shift
// @route   POST /api/labmanager/roster
export const addStaffShift = async (req, res) => {
  try {
    const { name, dept, shift } = req.body;
    if (!name || !dept || !shift) {
      return res.status(400).json({ success: false, message: 'Please provide name, dept, and shift' });
    }
    const newShift = await StaffRoster.create({ name, dept, shift });
    res.status(201).json({
      success: true,
      data: {
        id: newShift._id.toString(),
        _id: newShift._id,
        name: newShift.name,
        dept: newShift.dept,
        shift: newShift.shift,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove Staff Shift
// @route   DELETE /api/labmanager/roster/:id
export const removeStaffShift = async (req, res) => {
  try {
    const { id } = req.params;
    await StaffRoster.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Shift removed from database' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Operations Overview & Departmental Breakdown
// @route   GET /api/labmanager/operations-overview
export const getOperationsOverview = async (req, res) => {
  try {
    const roster = await StaffRoster.find();

    const deptStaffCount = (dept) => roster.filter((s) => s.dept === dept).length;

    const data = {
      avgTat: '28 Min',
      pendingLabSamples: 36,
      activeStaffCount: roster.length,
      maxStaffLimit: 8,
      departments: [
        {
          name: 'Biochemistry',
          pendingSamples: 22,
          avgProcessTime: '34 mins',
          staffCount: deptStaffCount('Biochemistry'),
          status: deptStaffCount('Biochemistry') < 2 ? 'Staffing Alert' : 'Healthy',
        },
        {
          name: 'Hematology',
          pendingSamples: 8,
          avgProcessTime: '18 mins',
          staffCount: deptStaffCount('Hematology'),
          status: 'Optimal',
        },
        {
          name: 'Radiology',
          pendingSamples: 2,
          avgProcessTime: '45 mins',
          staffCount: deptStaffCount('Radiology'),
          status: 'Optimal',
        },
        {
          name: 'Microbiology',
          pendingSamples: 4,
          avgProcessTime: '72 mins',
          staffCount: deptStaffCount('Microbiology'),
          status: 'Optimal',
        },
      ],
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Quality Control & Equipment Calibration Data
// @route   GET /api/labmanager/quality-control
export const getQualityControl = async (req, res) => {
  try {
    const qcRecords = await QualityControl.find();
    res.status(200).json({
      success: true,
      count: qcRecords.length,
      data: qcRecords.map((q) => ({
        id: q._id.toString(),
        instrumentName: q.instrumentName,
        percentage: `${q.measuredValue}%`,
        statusText: `Status: ${q.parameterTested}`,
        dueDateText: q.comments,
        value: q.measuredValue,
        status: q.status,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
