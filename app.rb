require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'
require_relative './model.rb'
enable :sessions

# help functions
def testUser()
    # temp user logged in
    user = {
        username: "Admin",
        userId: 1
    }
    session[:user] = user
end

def loggedIn()
  return session[:user] != nil
end
def not_for_user()
  if loggedIn()
    redirect('/new/post')
  end
end
def for_user()
  if !loggedIn()
    redirect('/')
  end
end
def get_userId() 
  return session[:user][:userId]
end
def get_username()
  return session[:user][:username]
end

# Authorization
def isAdmin()
end

# Routes

# first page
get ('/') do
    testUser()
    not_for_user()
    slim(:start)
end

# home site for when logged in
get ('/home') do
  for_user
  if loggedIn()
    slim(:"users/home")
  else
    redirect('/')
  end
end

# log in page
get ('/login') do
  not_for_user
  slim(:login)
end

# sign up page
get ('/signup') do
  not_for_user
  slim(:signup)
end

# restores logged session to nil and redirects to homepage
get ('/logout') do
  redirect('/')
end

# account info site
get ('/account') do
  for_user
  slim(:"users/account")
end

# take username and password from user who is trying to log in and check
#with database if user exists as well as if the password is correct
post ('/users/login') do
  username = params[:username]
  password = params[:password]
  login_user(username, password)
  redirect('/home')
end

# Add user if everything is right. Add both new user and new pongWins score in database.
post ('/users/signup') do
  username = params[:username]
  password = params[:password]
  confirm_password = params[:confirm_password]
  register_user(username, password, confirm_password)
  redirect('/')
end

# show all project - in order of latest updated
get ('/projects') do 
end

# show all projects of specific user
get ('/:username/projects') do
  username = params[:username]
  slim(:"projects/show", locals:{username: username})
end

# create post page
get ('/new/post') do
  for_user
  db = SQLite3::Database.new('db/blog.db')
  db.results_as_hash = true
  projects = db.execute("SELECT * FROM projects WHERE userId=?", session[:user][:userId])
  projectTitles = []
  projects.each do |project|
      projectTitles << project["projectTitle"]
  end
  slim(:"posts/create", locals:{projectTitles: projectTitles})
end

# upload post
post ('/posts/create') do
  postProject = params[:postProject]
  postTitle = params[:postTitle]
  postDesc = params[:postDesc]
  postContent = params[:postContent]
  postDate = params[:postDate]
  if params[:postIsDraft] == "on" # if isDraft is checked
    postIsDraft = 1
  else 
    postIsDraft = 0
  end
  if params[:postIsPublic] == "on" # if isPublic is checked
    postIsPublic = 1
  else 
    postIsPublic = 0
  end
  userId = get_userId
  new_post(userId, postProject, postTitle, postDesc, postContent, postDate, postIsPublic, postIsDraft)
  redirect('/')
end