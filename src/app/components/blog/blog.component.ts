import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  title = '';
  content = '';
  image: File | null = null;
  message = '';

  constructor(
    private readonly blogService: BlogService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    if (!this.authService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }
  }

  onFileChange(event: any): void {
    this.image = event.target.files[0];
  }

  postBlog(): void {
    if (this.title && this.content) {
      const blog = {
        title: this.title,
        content: this.content,
        image: this.image ? URL.createObjectURL(this.image) : null,
        date: new Date(),
      };
      this.blogService.addBlog(blog);
      this.message = 'Blog posted successfully!';
      this.router.navigate(['/']);
    } else {
      this.message = 'Please provide a title and content.';
    }
  }
}
