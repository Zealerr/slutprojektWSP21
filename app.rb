require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'
require_relative './model.rb'
enable :sessions

# help functions
def testUser()
    # temp user logged in
    user = User.new("Admin", 1)
    session[:user] = user
end

def loggedIn()
  return session[:user] != nil
end
def not_for_user()
  if loggedIn()
    redirect('/posts/new')
  end
end
def for_user()
  if !loggedIn()
    redirect('/')
  end
end
def get_userId() 
  return session[:user].userId
end
def get_username()
  return session[:user].username
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
get ('user/account') do
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
get ('/posts/new') do
  for_user
  slim(:"posts/new")
end

# upload post
post ('/posts/new') do
  # upload images if there are any
  upload_images(params[:img])

  userId = get_userId
  projectId = params[:projectId]
  # check if project exists and is owned by current user
  if !check_project(userId, projectId)
    p "project is not yours, please select from the menu and not through console"
    redirect('/posts/new')
  end
  postTitle = params[:title]
  # check if post with that title already exist in the specific project
  if check_post(postTitle, projectId)
    p "A post with that name already exists"
    redirect('/posts/new')
  end
  postDesc = params[:desc]
  postContent = params[:content]
  postDate = params[:date]
  postIsPublic = params[:isPublic]
  postTags = params[:tags]
  

  post = Post.new(projectId, postTitle, postDesc, postContent, postDate, postIsPublic, postTags)
  new_post(userId, post)
  redirect('/')
end

# post ('/posts/test') do
#   upload_images([params[:image]])
#   redirect('/posts/new')
# end


# create project page
get ('/projects/new') do
  testUser()
  for_user
  slim(:"projects/new")
end

post ('/projects/new') do
  p params[:"projectImg#{}"]
  redirect('/')
end