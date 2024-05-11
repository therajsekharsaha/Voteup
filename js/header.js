document.write(`
\
\
<!-- navbar start -->   
<nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid mx-lg-5 mx-md-3 mx-1">
        <a class="navbar-brand text-white" id="logo">VoteUp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="cursor: pointer;">
                <li class="nav-item">
                    <a class="nav-link active text-white" aria-current="page" id="home">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active text-white" aria-current="page" id="users">Users</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Games
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" aria-current="page" id="game">Game</a></li>
                        <li><a class="dropdown-item" aria-current="page" id="point_table">Point table</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        My Account
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" id="profile">Profile</a></li>
                        <li><a class="dropdown-item" id="forgetpass">Forget password</a></li>
                        <li><a class="dropdown-item" id="d_info">developer info</a></li>
                        <li><a class="dropdown-item" id="feedback">feedback</a></li>
                        <li><a class="dropdown-item" id="share">share</a></li>
                        <li><a class="dropdown-item" id="logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<!-- navbar end -->

\
`)