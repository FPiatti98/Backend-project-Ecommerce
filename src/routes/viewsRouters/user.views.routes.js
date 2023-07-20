import { Router } from "express";
import { checkAuth } from '../../config/passport.config.js';
import { userModel } from "../../service/db/models/user.model.js";

const router = Router();

router.get('/' ,checkAuth, async(req, res) => {

    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
  
    try {
      const users = await userModel.paginate({}, {
        select: 'first_name last_name email age role',
        limit,
        page,
        lean: true
      });
  
      users.prevLink = users.hasPrevPage ? `/users?page=${users.prevPage}&limit=${users.limit}` : '';
      users.nextLink = users.hasNextPage ? `/users?page=${users.nextPage}&limit=${users.limit}` : '';
      users.isValid = !(page <= 0 || page > users.totalPages);
  
      res.render('users', { users });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
})

router.get("/login", (req, res) => {
    res.render("login")
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/current", checkAuth, async(req, res) => {
    const user = req.session.user
    res.render("profile", {user : user})
})

export default router;