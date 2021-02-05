require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'

enable :sessions



get ('/') do #temp create projects
    #temp user logged in
    session[:username] = "Admin"
    redirect('/projects')
end

get ('/projects') do
    slim(:"projects/create")
end