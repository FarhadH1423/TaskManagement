<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\repositories\TaskRepository;

class TasksController extends Controller
{
    public $TaskRepository;

    public function __construct(TaskRepository $TaskRepository) {
        $this->TaskRepository = $TaskRepository;
    }

    //Get All Task List
    public function index()
    {
        $Tasks = $this->TaskRepository->getall();

        return response()->json([
            'success' => true,
            'message' =>'Task List',
            'data'    => $Tasks
        ]);
    }

    public function show($id)
    {
        $Task = $this->TaskRepository->findById($id);

        if (is_null($Task)) {
            return response()->json([
                'success' => false,
                'message' =>'Task Details',
                'data'    => null
            ]);
        }

        return response()->json([
            'success' => true,
            'message' =>'Task Details',
            'data'    => $Task
        ]);
    }

    //Create API for Tasks

    public function store(Request $request)
    {

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name'=>'required',
            'description' => 'required',
            'project_id' => 'required'
        ], [
            'name.required' => 'Please give Task name',
            'description.required' => 'Please give Task description',
        ]);
            if ($validator->fails()){
            return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors'  => $validator->getMessageBag(),
            
        ]);
        }

        $Task = $this->TaskRepository->create($request);
        return response()->json([
            'success' => true,
            'message' =>'Task Stored',
            'data'    => $Task
        ]);
    }

    //Update API for Tasks

    public function update(Request $request, $id)
    {
        $Task = $this->TaskRepository->findById($id);
        if(is_null($Task))
        {

            return response()->json([
                'success' => false,
                'message' => 'Task Not Found',
                'data'  => null,
                
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name'=>'required',
            'description' => 'required',
            'project_id' => 'required'
        ], [
            'name.required' => 'Please give Task name',
            'description.required' => 'Please give Task description',
        ]);
            if ($validator->fails()){
            return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors'  => $validator->getMessageBag(),
            
        ]);
        }

        $Task = $this->TaskRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' =>'Task Updated',
            'data'    => $Task
        ]);
    }

    //Delete API for Tasks

    public function destroy( $id)
    {
        $Task = $this->TaskRepository->findById($id);
        if(is_null($Task))
        {

            return response()->json([
                'success' => false,
                'message' => 'Task Not Found',
                'data'  => null,
                
            ]);
        }

        

        $Task = $this->TaskRepository->delete( $id);
        return response()->json([
            'success' => true,
            'message' =>'Task Deleted',
            'data'    => $Task
        ]);
    }

}

