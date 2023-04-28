
import express from 'express'
import { createAircraft, deleteAircraft, getAllAircrafts, updateAircraft } from '../controllers/aircraftController.js';
import { register, login, getAllUsers, updateUser, getUsersById, updatePassword, forgetPassword, forgetLink, getCrewByKey, getClientByKey, deleteUser , getClientById} from "../controllers/authController.js";
import { addBankDetails, getAllDetails, bankDetailById, updateBankStatus, updateBankDetails , deleteBankById } from '../controllers/bankDetails.js';
import { createClient, deleteClient, getAllClients, getClientByemail, updateClientByMail } from "../controllers/clientController.js";
import { createCrew, deleteCrew, getAllCrews, getCrewByName, deleteCrewById, getCrewByemail, updateCrewByMail, mailToCrewMember } from '../controllers/crewController.js';
import { addDocument, getAllDocuments , getDocumentByTripId } from '../controllers/documentController.js';
import { getAllPayments, paymentByClientId, paymentController } from '../controllers/paymentController.js';
import {addSystemSetting ,  getSettingById , updateSetting , getAllSettings} from "../controllers/systemSetting.js"
import {
     addCrewSignTrips,addCrewToTripsByClientId, deleteTripCrewMemberByCrewId, deleteCrewExpenseById, addCrewToTrips, addingTripExpenses, addTripWithCrew, createTrip, deleteTrip, getTripById,
     statusApproveExpenseById, getAllTrips, getCrewExpense, TripsByClientId, TripsByCrewId, updateTripClientDocumentStatus, updateTripDocumentStatus, updateTripStatus, updateTripDetails
} from '../controllers/tripController.js';
import {addInvoiceSetting , getInvoiceById} from "../controllers/invoiceController.js"
const router = express.Router();
// System settings
router.post("/addSystemSetting",addSystemSetting)
router.post("/getSettingById",getSettingById)
router.post("/updateSetting",updateSetting)
router.get("/getAllSettings",getAllSettings)
// Inovice Setting
router.post("/addInvoiceSetting",addInvoiceSetting)
router.post('/getInvoiceById', getInvoiceById)
//auth
router.post('/reg', register);
router.post('/log', login);
router.get('/getAllUsers', getAllUsers)
router.post('/userById', getUsersById)
router.post('/getClientById', getClientById)
router.post('/forgetPassword', forgetPassword);
router.post('/updatePassword', updatePassword);
router.put('/updateUser', updateUser);
router.post('/forgetLink', forgetLink);
router.get('/crewByKey', getCrewByKey)
router.get('/clientByKey', getClientByKey)
router.post('/deleteUserById', deleteUser);
//client
router.post('/createClient', createClient);
router.get('/getAllClients', getAllClients);
router.post('/deleteClientById', deleteClient);
router.get('/getClientByemail/:email', getClientByemail)
router.post('/updateClientByMail', updateClientByMail)
//crew
router.post('/createCrew', createCrew);
router.post('/mailToCrewMember', mailToCrewMember);
router.get('/getAllCrews', getAllCrews);
router.post('/deleteCrewById', deleteCrew);
router.post('/getCrewByName', getCrewByName)
router.delete('/deleteCrewByIdd', deleteCrewById)
router.get('/getCrewByemail/:email', getCrewByemail)
router.post('/updateCrewByMail', updateCrewByMail)
// bankDetails
router.post('/addBankDetails', addBankDetails);
router.get('/getAllDetails', getAllDetails);
router.post("/getBankDetailById", bankDetailById)
router.put('/updateBankStatus', updateBankStatus);
router.put('/updateBankDetails', updateBankDetails);
router.post('/deleteBankById', deleteBankById);

//aircraft
router.post('/addAircraftDetails', createAircraft);
router.get('/getAllAircrafts', getAllAircrafts);
router.post('/deleteAircraftById', deleteAircraft);
router.put('/updateAircraft', updateAircraft);

//trips
router.post('/addCrewToTripsByClientId', addCrewToTripsByClientId);
router.post("/deleteCrewMemberByCrewId", deleteTripCrewMemberByCrewId)
router.post("/deleteCrewExpenseById", deleteCrewExpenseById)
router.post('/addTripDetails', createTrip);
router.get('/getTripById/:id', getTripById);
router.put('/updateTripDetails', updateTripDetails);
router.get('/getAllTrips', getAllTrips);
router.post('/deleteTripById', deleteTrip);
router.post('/getAllTripsByClientId', TripsByClientId);
router.post('/addCrewToTrips', addCrewToTrips);
router.post('/addCrewSignTrips', addCrewSignTrips);
router.put('/updateTripStatus', updateTripStatus);
router.post('/addTripwithCrew', addTripWithCrew);
router.post('/getAllTripsByCrewId', TripsByCrewId);
router.post('/addTripExpenses', addingTripExpenses);
router.post('/getCrewExpense', getCrewExpense);
router.put('/updateDocumentStatus', updateTripDocumentStatus);
router.put('/updateClientDocumentStatus', updateTripClientDocumentStatus);
router.put('/statusApproveExpenseById', statusApproveExpenseById);
//document
router.post('/addDocument', addDocument);
router.get('/getAllDocuments', getAllDocuments);
router.post('/getDocumentByTripId', getDocumentByTripId);
//strip
router.post('/stripPayment', paymentController);
router.post('/getPaymentByClientId', paymentByClientId);
router.get('/getAllPayments', getAllPayments);

export default router;