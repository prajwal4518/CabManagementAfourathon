const Driver = require("../models/driver.model");

/**
 * @api {get} /api/drivers Get all drivers
 * @apiName GetAllDrivers
 * @apiGroup Drivers
 *
 * @apiSuccess {Object[]} drivers Array of driver objects.
 * @apiSuccess {String} drivers._id Driver ID.
 * @apiSuccess {String} drivers.name Driver name.
 * @apiSuccess {String} drivers.idNumber Driver ID number.
 * @apiSuccess {String} drivers.email Driver email.
 * @apiSuccess {String} drivers.phoneNumber Driver phone number.
 *
 * @apiError (500) InternalServerError Internal server error.
 */
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @api {get} /api/drivers/:id Get driver by ID
 * @apiName GetDriverById
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver ID.
 *
 * @apiSuccess {String} _id Driver ID.
 * @apiSuccess {String} name Driver name.
 * @apiSuccess {String} idNumber Driver ID number.
 * @apiSuccess {String} email Driver email.
 * @apiSuccess {String} phoneNumber Driver phone number.
 *
 * @apiError (404) NotFound Driver not found.
 * @apiError (500) InternalServerError Internal server error.
 */
const getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @api {post} /api/drivers Create a new driver
 * @apiName CreateDriver
 * @apiGroup Drivers
 *
 * @apiParam {String} name Driver name.
 * @apiParam {String} idNumber Driver ID number.
 * @apiParam {String} email Driver email.
 * @apiParam {String} phoneNumber Driver phone number.
 *
 * @apiSuccess {String} _id Driver ID.
 * @apiSuccess {String} name Driver name.
 * @apiSuccess {String} idNumber Driver ID number.
 * @apiSuccess {String} email Driver email.
 * @apiSuccess {String} phoneNumber Driver phone number.
 *
 * @apiError (500) InternalServerError Internal server error.
 */
const createDriver = async (req, res) => {
  const { name, idNumber, email, phoneNumber } = req.body;
  try {
    const driver = await Driver.create({
      name,
      idNumber,
      email,
      phoneNumber,
    });
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @api {put} /api/drivers/:id Update driver by ID
 * @apiName UpdateDriver
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver ID.
 * @apiParam {String} name Driver name.
 * @apiParam {String} idNumber Driver ID number.
 * @apiParam {String} email Driver email.
 * @apiParam {String} phoneNumber Driver phone number.
 *
 * @apiSuccess {String} _id Driver ID.
 * @apiSuccess {String} name Driver name.
 * @apiSuccess {String} idNumber Driver ID number.
 * @apiSuccess {String} email Driver email.
 * @apiSuccess {String} phoneNumber Driver phone number.
 *
 * @apiError (404) NotFound Driver not found.
 * @apiError (500) InternalServerError Internal server error.
 */
const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, idNumber, email, phoneNumber } = req.body;
  try {
    const driver = await Driver.findByIdAndUpdate(
      id,
      { name, idNumber, email, phoneNumber },
      { new: true }
    );
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @api {delete} /api/drivers/:id Delete driver by ID
 * @apiName DeleteDriver
 * @apiGroup Drivers
 *
 * @apiParam {String} id Driver ID.
 *
 * @apiSuccess {Object} message Success message.
 * @apiSuccess {String} message.message Success message.
 *
 * @apiError (404) NotFound Driver not found.
 * @apiError (500) InternalServerError Internal server error.
 */
const deleteDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByIdAndDelete(id);
    if (driver) {
      res.json({ message: "Driver deleted successfully" });
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};
