Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  get '/upload/', to: 'static_pages#root'
  get '/explore/', to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:destroy, :create, :show]
    resources :songs, only: [:index, :create, :update, :show, :destroy]
    resources :likes, only: [:create]
    resources :followers, only: [:create]
    resources :comments, only: [:index, :create, :destroy]
    resources :random_songs, only: [:index]
    resources :random_no_info_songs, only: [:index]
  end

  get '/:username/', to: 'static_pages#root'
  get '/:username/:song_id', to: 'static_pages#root'

end


