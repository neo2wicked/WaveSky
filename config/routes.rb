Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  get '/upload/', to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:destroy, :create, :show]
    resources :songs, only: [:index, :create]
    resources :likes, only: [:index, :create]

  end

  get '/:username/', to: 'static_pages#root'

end


