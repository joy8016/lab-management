import Branch from '../models/Branch.js';
import TestCatalogItem from '../models/TestCatalogItem.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';

// Auto-seed initial branches if DB empty
const seedBranches = async () => {
  const count = await Branch.countDocuments();
  if (count === 0) {
    const initialBranches = [
      { name: 'Main Lab HQ', address: '102 Medical Drive', city: 'Metropolis', staff: 14, status: 'Active' },
      { name: 'City Clinic', address: '405 Plaza Ave Suite 4', city: 'Metropolis', staff: 6, status: 'Active' },
      { name: 'Mary Lab', address: '98 St. Mary Street', city: 'Gotham', staff: 5, status: 'Active' },
      { name: 'Twin Lab', address: '881 Twin Peaks Road', city: 'Twin Peaks', staff: 4, status: 'Active' },
      { name: 'July Lab', address: '501 Summer Blvd', city: 'Star City', staff: 8, status: 'Active' },
    ];
    await Branch.insertMany(initialBranches);
  }
};

// Auto-seed initial test catalog if DB empty
const seedTestCatalog = async () => {
  const count = await TestCatalogItem.countDocuments();
  if (count === 0) {
    const initialTests = [
      {
        code: 'BIO-102',
        name: 'Fasting Blood Sugar (FBS)',
        alias: 'FBS / Glucose Fasting',
        category: 'Biochemistry',
        sampleType: 'Serum / Plasma',
        sampleVolume: '1 ml',
        container: 'Grey Top (Sodium Fluoride)',
        tat: '4 Hours',
        status: 'Active',
        isPanel: false,
        method: 'Spectrophotometry / Hexokinase',
        handling: 'Fasting 8-10 hours required. Separate serum within 1 hr.',
        units: 'mg/dL',
        branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab', 'Twin Lab', 'July Lab'],
        parameters: [
          { name: 'Glucose (Fasting)', unit: 'mg/dL', maleMin: 70, maleMax: 99, femaleMin: 70, femaleMax: 99, critLow: 50, critHigh: 300 },
        ],
      },
      {
        code: 'HEM-001',
        name: 'Complete Blood Count (CBC)',
        alias: 'CBC / Hemogram',
        category: 'Hematology',
        sampleType: 'EDTA Whole Blood',
        sampleVolume: '2 ml',
        container: 'Purple Top (EDTA)',
        tat: '6 Hours',
        status: 'Active',
        isPanel: true,
        method: 'Automated Hematology Flow Cytometry',
        handling: 'Mix gently by inverting tube 8 times. Do not freeze.',
        units: 'Mixed',
        branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab', 'Twin Lab', 'July Lab'],
        parameters: [
          { name: 'Hemoglobin (Hb)', unit: 'g/dL', maleMin: 13.5, maleMax: 17.5, femaleMin: 12.0, femaleMax: 15.5, critLow: 7.0, critHigh: 20.0 },
          { name: 'Total WBC Count', unit: 'x10^3/mcL', maleMin: 4.5, maleMax: 11.0, femaleMin: 4.5, femaleMax: 11.0, critLow: 2.0, critHigh: 30.0 },
          { name: 'Platelet Count', unit: 'x10^3/mcL', maleMin: 150, maleMax: 450, femaleMin: 150, femaleMax: 450, critLow: 50, critHigh: 1000 },
        ],
      },
      {
        code: 'LIP-201',
        name: 'Lipid Profile Panel',
        alias: 'Lipid Panel / Cholesterol Test',
        category: 'Biochemistry',
        sampleType: 'Serum',
        sampleVolume: '2 ml',
        container: 'Red Top (Plain) / SST',
        tat: '12 Hours',
        status: 'Active',
        isPanel: true,
        method: 'Enzymatic Colorimetric Assay',
        handling: 'Patient should fast 12 hours prior to collection.',
        units: 'mg/dL',
        branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab'],
        parameters: [
          { name: 'Total Cholesterol', unit: 'mg/dL', maleMin: 125, maleMax: 200, femaleMin: 125, femaleMax: 200, critLow: 90, critHigh: 300 },
          { name: 'HDL Cholesterol', unit: 'mg/dL', maleMin: 40, maleMax: 60, femaleMin: 50, femaleMax: 70, critLow: 25, critHigh: 100 },
        ],
      },
      {
        code: 'LFT-301',
        name: 'Liver Function Test (LFT)',
        alias: 'Hepatic Function Panel',
        category: 'Biochemistry',
        sampleType: 'Serum',
        sampleVolume: '3 ml',
        container: 'Red Top (Plain)',
        tat: '8 Hours',
        status: 'Active',
        isPanel: true,
        method: 'Automated Photometric Analysis',
        handling: 'Protect specimen from light exposure.',
        units: 'U/L & mg/dL',
        branches: ['Main Lab HQ', 'City Clinic', 'July Lab'],
        parameters: [
          { name: 'ALT (SGPT)', unit: 'U/L', maleMin: 7, maleMax: 56, femaleMin: 7, femaleMax: 45, critLow: 0, critHigh: 500 },
        ],
      },
    ];
    await TestCatalogItem.insertMany(initialTests);
  }
};

// Auto-seed audit logs if DB empty
const seedAuditLogs = async () => {
  const count = await AuditLog.countDocuments();
  if (count === 0) {
    const initialLogs = [
      { time: '10:55 AM', userAction: 'Admin X updated reference range for Test Y', impactedEntity: 'Test Y', admin: 'Super Admin' },
      { time: '10:42 AM', userAction: 'Provisioned new Lab Technician account', impactedEntity: 'User: Charlie Davis', admin: 'Super Admin' },
      { time: '09:30 AM', userAction: 'Approved affiliate center registration', impactedEntity: 'Branch: Main Lab HQ', admin: 'Super Admin' },
    ];
    await AuditLog.insertMany(initialLogs);
  }
};

// Auto-seed initial users if DB empty
const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    const initialUsers = [
      { fullName: 'Alice Smith', email: 'alice@lims.org', password: 'password123', role: 'lab-manager', status: 'Active' },
      { fullName: 'Bob Johnson', email: 'bob@lims.org', password: 'password123', role: 'pathologist', status: 'Active' },
      { fullName: 'Charlie Davis', email: 'charlie@lims.org', password: 'password123', role: 'lab-technician', status: 'Active' },
      { fullName: 'Diana Prince', email: 'diana@lims.org', password: 'password123', role: 'receptionist', status: 'Active' },
      { fullName: 'Evan Wright', email: 'evan@lims.org', password: 'password123', role: 'sample-collector', status: 'Suspended' },
    ];
    for (const u of initialUsers) {
      await User.create(u);
    }
  }
};

// @desc    Get Super Admin Dashboard Overview Stats
// @route   GET /api/superadmin/dashboard-stats
export const getDashboardStats = async (req, res) => {
  try {
    const activeUsersCount = await User.countDocuments({ status: 'Active' });
    const totalTestsCount = await TestCatalogItem.countDocuments();
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(10);
    const branches = await Branch.find();

    res.status(200).json({
      success: true,
      data: {
        activeUsersCount: activeUsersCount || 0,
        totalTestsCount: totalTestsCount || 0,
        pendingApprovalsCount: 0,
        securityAlertsCount: 0,
        auditLogs: logs.map((l) => ({
          time: l.time,
          userAction: l.userAction,
          impactedEntity: l.impactedEntity,
        })),
        branchesCount: branches.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get All Affiliate Branches
// @route   GET /api/superadmin/branches
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: branches.length,
      data: branches.map((b) => ({
        id: b._id.toString(),
        _id: b._id,
        name: b.name,
        address: b.address,
        city: b.city,
        staff: b.staff,
        status: b.status,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add New Affiliate Branch
// @route   POST /api/superadmin/branches
export const addBranch = async (req, res) => {
  try {
    const { name, address, city } = req.body;
    if (!name || !address || !city) {
      return res.status(400).json({ success: false, message: 'Please provide branch name, address, and city' });
    }
    const newBranch = await Branch.create({ name, address, city, staff: 1, status: 'Active' });

    // Log action
    await AuditLog.create({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userAction: `Registered new affiliate branch: ${name}`,
      impactedEntity: `Branch: ${name} (${city})`,
    });

    res.status(201).json({
      success: true,
      data: {
        id: newBranch._id.toString(),
        _id: newBranch._id,
        name: newBranch.name,
        address: newBranch.address,
        city: newBranch.city,
        staff: newBranch.staff,
        status: newBranch.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Users/Employees List
// @route   GET /api/superadmin/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    const formatRole = (r) => {
      if (!r) return 'Lab Technician';
      if (r === 'super-admin') return 'Super Admin';
      if (r === 'lab-manager') return 'Lab Manager';
      if (r === 'pathologist') return 'Pathologist';
      if (r === 'lab-technician') return 'Lab Technician';
      if (r === 'sample-collector') return 'Sample Collector';
      if (r === 'receptionist') return 'Receptionist';
      return r;
    };

    res.status(200).json({
      success: true,
      count: users.length,
      data: users.map((u) => ({
        id: u._id.toString(),
        _id: u._id,
        name: u.fullName,
        email: u.email,
        role: formatRole(u.role),
        status: u.status || 'Active',
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Provision New Employee User Account
// @route   POST /api/superadmin/users
export const provisionUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email, and role' });
    }

    const roleMap = {
      'Lab Manager': 'lab-manager',
      'Pathologist': 'pathologist',
      'Lab Technician': 'lab-technician',
      'Receptionist': 'receptionist',
      'Sample Collector': 'sample-collector',
      'Super Admin': 'super-admin',
    };

    const dbRole = roleMap[role] || role.toLowerCase().replace(/\s+/g, '-');

    const newUser = await User.create({
      fullName: name,
      email,
      password: 'Password123!',
      role: dbRole,
      status: 'Active',
    });

    await AuditLog.create({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userAction: `Provisioned new ${role} account: ${name}`,
      impactedEntity: `User: ${email}`,
    });

    res.status(201).json({
      success: true,
      data: {
        id: newUser._id.toString(),
        _id: newUser._id,
        name: newUser.fullName,
        email: newUser.email,
        role: role,
        status: newUser.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle User Account Status (Active / Suspended)
// @route   PUT /api/superadmin/users/:id/toggle-status
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
    await user.save();

    await AuditLog.create({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userAction: `Updated account status for ${user.fullName} to ${user.status}`,
      impactedEntity: `User: ${user.email}`,
    });

    res.status(200).json({
      success: true,
      message: `User status changed to ${user.status}`,
      data: {
        id: user._id.toString(),
        _id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Diagnostic Test Catalog
// @route   GET /api/superadmin/test-catalog
export const getTestCatalog = async (req, res) => {
  try {
    const tests = await TestCatalogItem.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tests.length,
      data: tests.map((t) => ({
        id: t._id.toString(),
        _id: t._id,
        code: t.code,
        name: t.name,
        alias: t.alias,
        category: t.category,
        sampleType: t.sampleType,
        sampleVolume: t.sampleVolume,
        container: t.container,
        tat: t.tat,
        status: t.status,
        isPanel: t.isPanel,
        method: t.method,
        handling: t.handling,
        units: t.units,
        branches: t.branches,
        parameters: t.parameters,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add Diagnostic Test to Catalog
// @route   POST /api/superadmin/test-catalog
export const addTestCatalogItem = async (req, res) => {
  try {
    const { code, name, category, sampleType, container, tat } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Please provide test name and category' });
    }

    const newCode = code || `TST-${Math.floor(100 + Math.random() * 900)}`;

    const newTest = await TestCatalogItem.create({
      code: newCode,
      name,
      alias: req.body.alias || name,
      category,
      sampleType: sampleType || 'Serum',
      sampleVolume: req.body.sampleVolume || '2 ml',
      container: container || 'Red Top (Plain)',
      tat: tat || '6 Hours',
      status: 'Active',
      isPanel: req.body.isPanel || false,
      method: req.body.method || 'Automated Assay',
      handling: req.body.handling || 'Standard handling',
      units: req.body.units || 'mg/dL',
      branches: req.body.branches || ['Main Lab HQ'],
      parameters: req.body.parameters || [],
    });

    await AuditLog.create({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userAction: `Created new diagnostic test: ${name} (${newCode})`,
      impactedEntity: `Test Catalog Item: ${newCode}`,
    });

    res.status(201).json({
      success: true,
      data: newTest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Pricing & Financial Management Overview
// @route   GET /api/superadmin/pricing-billing
export const getPricingBilling = async (req, res) => {
  try {
    const tests = await TestCatalogItem.find();
    
    const revenueSummary = {
      grossRevenue: '₹0.00',
      netRevenue: '₹0.00',
      receivables: '₹0.00',
      refunds: '₹0.00',
      growth: '0% vs last month',
    };

    const branchRevenue = [];

    res.status(200).json({
      success: true,
      data: {
        revenueSummary,
        branchRevenue,
        tests: tests.map((t) => ({
          id: t._id.toString(),
          _id: t._id,
          code: t.code,
          name: t.name,
          category: t.category,
          basePrice: t.basePrice || 50,
          isPackage: t.isPanel,
          cityMultiplier: t.cityMultiplier || 1.1,
          discount: t.discount || '0%',
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Test Price in Matrix
// @route   PUT /api/superadmin/pricing-matrix/:id
export const updateTestPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { basePrice, discount, cityMultiplier } = req.body;

    const testItem = await TestCatalogItem.findById(id);
    if (!testItem) {
      return res.status(404).json({ success: false, message: 'Test item not found' });
    }

    if (basePrice !== undefined) testItem.basePrice = Number(basePrice);
    if (discount !== undefined) testItem.discount = discount;
    if (cityMultiplier !== undefined) testItem.cityMultiplier = Number(cityMultiplier);

    await testItem.save();

    await AuditLog.create({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userAction: `Updated pricing matrix for ${testItem.name} (${testItem.code}) - Base Price: $${testItem.basePrice}`,
      impactedEntity: `Test Pricing: ${testItem.code}`,
    });

    res.status(200).json({
      success: true,
      data: testItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
