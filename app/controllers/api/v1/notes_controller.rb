class Api::V1::NotesController < ApplicationController
  before_action :find_note, only: [:update, :destroy]
  # before_action :authenticate_user


  def index
    @notes = Note.all
    render :json => @notes, status: @ok  
    # if curr_user 
    #   private_notes = Note.where('is_public = ? AND user_id = ?', false, curr_user.id)
    #   render :json => @notes.to_a.push(private_notes).flatten, status: @ok
    # else
    #   render :json => @notes, status: @ok 
    # end
  end

  def show
   render :json => @note, status: @ok
  end
  
  def create 
    @note = Note.create!(note_params)
    if @note.save 
      render :json => @note, status: @ok   
    else        
      render :json => { errors: @note.errors.full_messages }, status:  @unprocessible_entity
    end
  end

  def update
    @note.update(note_params) 
    if @note.save 
      render :json => @note, status: @ok 
    else       
      render :json => { errors: @note.errors.full_messages }, status:  @unprocessible_entity
    end
  end

  def destroy
    note_id = @note.id
    if @note.delete  
      render :json => { noteId: note_id }
    else      
      render :json => {}, status: 401
    end  
  end

  private 

  def find_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.permit(:entry, :is_public, :service_id, :user_id, :current_user) 
  end


end
