<?php

namespace App\Http\Controllers;

use App\Models\dashboard;
use Illuminate\Http\Request;
use Inertia\Inertia;
class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dashboards = dashboard::all();

        return Inertia::render('dashboard', [
            'dashboards' => $dashboards,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'item' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string|max:255',
        ]);

        dashboard::create($request->all());

        return redirect()->route('dashboard')
                         ->with('success', 'Dashboard item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    // public function show(dashboard $dashboard)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(dashboard $dashboard)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, dashboard $dashboard)
    {
        $request->validate([
            'item' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string|max:255',
        ]);

        $dashboard->update($request->all());

        return redirect()->route('dashboard')
                         ->with('success', 'Dashboard item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(dashboard $dashboard)
    {
        $dashboard->delete();

        return redirect()->route('dashboard')
                         ->with('success', 'Dashboard item deleted successfully.');
    }
}
