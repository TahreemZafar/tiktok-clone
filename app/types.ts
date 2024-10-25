export interface RandomUser {
  id: string;
  name: string;
  image: string;
}

export interface CropperDimensions {
  height?: number | null;
  width?: number | null;
  left?: number | null;
  top?: number | null;
}

export interface ShowErrorObject {
  type: string;
  message: string;
}


export interface Likes {
  id: string;
  user_id: string;
  post_id: string;
}

export interface Post {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string
}

export interface Comments {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
}


export interface CommentWithProfile {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
  profile: {
      user_id: string;
      name: string;
      image: string;
  }
}


export interface UploadError {
  type: string;
  message: string;
}

//  LAYOUT INCLUDED TYPES

export interface ItemsTypes {
  iconString: string;
  colorString: string;
  sizeString: string;
}

export interface FollowCompTypes {
  user: RandomUser;
}

//    Components Types

export interface PostWithProfile {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  }
}

export interface PostMainLike {
  post: PostWithProfile;
}

export interface PostMainTypes {
  post: PostWithProfile;
}

export interface ProfileTypes {
  params: { id: string };
}

export interface User {
  id: string;
  name: string;
  bio: string;
  image: string;
}


export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  image: string;
}


export interface PostUserTypes {
  post: Post;
}


export interface TextInputTypes {
   name: string;
   string: string;
   inputType: string;
   placeholder: string;
   error: string;
   onUpdate: (newValue: string) => void;
}




export interface PostPageType {
  params: { userId: string, postId: string };
}


export interface CommentHeaderTypes {
  params: { userId: string, postId: string };
  post: PostWithProfile
}


export interface CommentsTypes {
  params: { userId: string, postId: string }
}


export interface SingleCommentTypes {
  params: { userId: string, postId: string }
  comment: CommentWithProfile
}





//   Context


export interface UserContextTypes {
   user: User | null;
   register: ( name: string, email: string, password: string ) => Promise<void>
   login: (  email: string, password: string ) => Promise<void>
   logout: () => Promise<void>
   checkUser: () => Promise<void>
}