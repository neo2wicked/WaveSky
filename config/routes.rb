require "byebug"
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  # debugger

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:destroy, :create, :show]

  end

  get '/:username/', to: 'static_pages#root'

  # get "/#{current_user}", to: 'static_pages#root'
end


