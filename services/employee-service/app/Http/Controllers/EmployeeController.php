<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // GET: List semua karyawan
    public function index() {
        return response()->json(Employee::all(), 200);
    }

    // POST: Tambah karyawan baru
    public function store(Request $request) {
        $employee = Employee::create($request->all());
        return response()->json(['message' => 'Created', 'data' => $employee], 201);
    }

    // GET {id}: Lihat satu karyawan
    public function show($id) {
        $employee = Employee::find($id);
        return $employee ? response()->json($employee) : response()->json(['message' => 'Not Found'], 404);
    }

    // PUT {id}: Update data karyawan
    public function update(Request $request, $id) {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->update($request->all());
            return response()->json(['message' => 'Updated', 'data' => $employee]);
        }
        return response()->json(['message' => 'Not Found'], 404);
    }

    // DELETE {id}: Hapus karyawan
    public function destroy($id) {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->delete();
            return response()->json(['message' => 'Deleted Successfully']);
        }
        return response()->json(['message' => 'Not Found'], 404);
    }
}// GET ALL
app.get('/api/employees', async (req, res) => {
    const response = await axios.get(`${EMPLOYEE_SERVICE_URL}/api/employees`);
    res.status(response.status).json(response.data);
});

// POST NEW
app.post('/api/employees', async (req, res) => {
    const response = await axios.post(`${EMPLOYEE_SERVICE_URL}/api/employees`, req.body);
    res.status(response.status).json(response.data);
});

// UPDATE (PUT)
app.put('/api/employees/:id', async (req, res) => {
    const response = await axios.put(`${EMPLOYEE_SERVICE_URL}/api/employees/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
});

// DELETE
app.delete('/api/employees/:id', async (req, res) => {
    const response = await axios.delete(`${EMPLOYEE_SERVICE_URL}/api/employees/${req.params.id}`);
    res.status(response.status).json(response.data);
});// GET ALL
app.get('/api/employees', async (req, res) => {
    const response = await axios.get(`${EMPLOYEE_SERVICE_URL}/api/employees`);
    res.status(response.status).json(response.data);
});

// POST NEW
app.post('/api/employees', async (req, res) => {
    const response = await axios.post(`${EMPLOYEE_SERVICE_URL}/api/employees`, req.body);
    res.status(response.status).json(response.data);
});

// UPDATE (PUT)
app.put('/api/employees/:id', async (req, res) => {
    const response = await axios.put(`${EMPLOYEE_SERVICE_URL}/api/employees/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
});

// DELETE
app.delete('/api/employees/:id', async (req, res) => {
    const response = await axios.delete(`${EMPLOYEE_SERVICE_URL}/api/employees/${req.params.id}`);
    res.status(response.status).json(response.data);
});