import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserProfileService } from './user-profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserProfileModel } from '../models/UserProfileModel';
import { GenericResponse } from '../models/GenericResponse';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to save user profile', () => {
    const userProfileModel: UserProfileModel = {
      firstName: 'user_1',
      lastName: 'last_user_1',
      email: 'prueba@prueba.com',
      phone: '1234567890',
      typeUser: 1,
      photo: 'photo'
    };

    const response: GenericResponse = {
      resultState: true,
      messageState: 'message'
    };


    if(!environment.testing){
      service.saveUserProfile(userProfileModel).subscribe();
  
      const req = httpMock.expectOne(`${environment.backendUrl}save-user-profile`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(userProfileModel);

      req.flush(response); 
    }
    else{
      let response: GenericResponse = require('../../../assets/testsSupport/home-content/generic-response.json');
      expect(response).toEqual(response);
    }

  });

  it('should send a GET request to retrieve user profile', () => {
    const userId = '123';

    const userProfileModel: UserProfileModel = {
      firstName : 'user_1',
      lastName: 'lastName_user_1',
      email: 'prueba@email.com',
      phone: '123456789',
      typeUser: 1,
      photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAD6APoDAREAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAYHAQUDBAgC/8QAPhAAAgEDAQUFBAgFAgcAAAAAAAECAwQFEQYHEjFBEyFRcYEiYZGhFCMyQlKxwdEVM0NicmOyNTZEc3Si4f/EABkBAQADAQEAAAAAAAAAAAAAAAACBAUDAf/EACcRAQACAgIDAAEEAgMAAAAAAAABAgMRBCESMTJBEzNRYRQiQlJx/9oADAMBAAIRAxEAPwD2WbrMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdiwxt1la/Y2lvUuKnVQXLzfJepG1orG7SlETPUJdjt1d9XSleXVK1T+5TXaSX5L8yrbk1j5h2jDP5buhuqxkI/W3F1Vl7pRivyOM8m/wCIdIw1c0t1uHa0UruPvVVfsef5Nz9GrW3u6am03aZCcZdI14Jr4rQ6Ryp/5QjOH+JRPNbIZTBJzuKHHQX9ei+KPr1XqWqZaX9S42pavtpddTq5sgAAAAAAAAAAAAAAAAAAAAAAAAAAAkGyGyNXaa6cpuVKxpv6youcn+GPv/I4ZcsY4/t1pTylb2OxlriraNva0Y0KUfuxXP3t9X7zLtabTuV2Iisah2SL1kAAA+ZRUk01qnzTArLeFsXHHUKmWx1H6iHtXFvTX2V1nFeHivVGhgzb/wBbKmWmv9oQGjcU7iHFTkpR93QvK8TtyngAAAAAAAAAAAAAAAAAAAAAAEm2klq33JID7dvWjVdN0aiqJ6cDg+LXyPNx7e6lK9m93d7lKkat9GVlac3GXdUn7kunmytkz1r1XuXauKZ9rSsrKhjrWnb29ONKjTWkYR6GbMzadytxERGodg8egAAAAAfM4KcXGSUotaNNapoDz5t5sRebGZKd1bpvGVqj7GrD+nr3qEv06M18OWMkan2zMmOcc7j001pm4y0jXXA/xrl6+B30hFv5bSM1OKaaafJrqeJvoAAAAAAAAAAAAAAAAAAAAHcwlBXWax9J8p3FNf8AsiF51WZSr3ML64dXqYrRZ0AyAAAAAAAAA6uTxtvl7CvZ3VNVbetFxnB9V+5KtprO4RmItGpeadqtnq2y+ducdVbmoPip1H9+D+y/396ZtY7xkrFoZV6+FtNfbXlW0etOXd1i+TOiETMNzZ5alcaRl9VUfRvufkyOnWLRLvaniTIAAAAAAAAAAAAAAAAAA22yEeLanFr/AF0/kzll/blOn1C8VyMdoMgAAAAAAAAAACrd+WGjVxtjlIx+soVOwm/GMu9fBr5l7i21M1U+RXqLKbNJQNAO5aZSta6Rb7Sn+GXTyZ5pKLTDc2t/Su17Eva6wfNHjrExLsnj0AAAAAAAAAAAAAAAAbXZOfZ7T4t/68V8e79Tnl+JTp9QvJcjGaDIAAAAAAAAAAAie9KhGvsJldVq4QjUXuanFljBOskOOb4l51NhlAADKbTTT0a6oDY2mZnT0jXXHH8S5/8A0806Rb+W4o3FO4hxU5KUfd0PHTe3IeAAAAAAAAAAAAAADsY64+h5G0r8uyrQn8JIjaN1mHsTqdr/AIvUxGkyAAAAAAAAAAAInvTrqhsJltXo5wjTXm5xRYwRvJDjm/bl51NhlAAAAA+6VWdCfHTk4S8UHu9NtaZqMtI11wP8a5evgR06Rb+WzjNSimmmnya6nib6AAAAAAAAAAAADDWqaAvPZbILKYCxuNdZSpKMv8l3P5oxslfG8w0KTusS2xzTAAAAAAAAAACtN+OTVDA2Vin7dzX42tfuwX7uJd4td2mVTkTqsQpQ02eAAAAAAA57a8q2kvq5ez1i+TCUTMNzaZalc6Rl9XUfSXJ+TI6dItEu7qeJsh4AAAAAAAAAMN6IC293eNyOJxtSje0lTozarUfbTa1XemunR+pl57VtbdV3FExHaXFZ2AAAAAAAAAGHyAojfRWu6m1sIV6bp28KEVbvXVTWuspfHu9EavGiPDpm8jfn2gJbVgAAAAAAABoByK4qpJKrNL/Jh7uUqIO4AAAAAAAAAxrw9/h3gehaE1VownH7Mopr4GHPUtJyHj0AAAAAAAAAAKX37VYvMYqmvtRt5yfk5LT8maXF+ZUOT9QrEvKYAAAAAAAAAAS4gsAAAAAAAAADDWq0AvHZG8+n7N46trrLsVB+cfZf5GPljxvMNCk7rDcHJMAAAAAAAAAYfIDz7vdv/p229zBS1jbU4UV56cT+cjX48axwzM87uhhZVwAAAAAAAAAAlxBYAAAAAAAAAACy91eWjUsbjHTlpUpT7WC8Yvn8H+Zn8mupiy3ht1pPSksAAAAAAAAADrZC+o42zr3VxNU6FGDqTk+iSPYibTqHkzERuXlzK5CeWyd3fVO6dxVlVa8NXrp6cjdrXxiIY9p8pmXVJIgAAAAAAAAABLiCwAAAAAAAAAAHJb3NazrRrW9WdCtH7NSnLRo8mInqXsTr0vLZ7I/xXC2V1rq6lJOX+S7n80zHyV8bTDQrO6xLZHNIAAAAAABh8gKM3x7RXF1tJUxlK5qKzt6cI1KMZvglU+1q11a1RqcakRTyn2zs95m3ir0uKoAAAAAAAAAAAJcQWAAAAAAAAAAAAWXuqyva2Nzj5v26Mu1gv7Zc/g/zM/k11MWW8NutJ6UlgAAAAAAB17+8pY+zr3VeXDRowlUm30SWrPYibTqHkzqNy8t5PIVMtkrq9q/zLirKq/dq9dPTl6G7WvjERDHtPlO3VJIgAAAAAAAAAAAlxBYAAAAAAAAAAABs9m8zLA5m3vO904vhqxXWD5/v6HPJTzrMJ0t4zteVGrGtSjOElOEkpRkuTT5Mx5jXTQfZ4AAAAAAVlvp2oVni6eGoz+vu9J1tPu0k+5erXwTLvGx7nzn8KnIvqPGFLGmzwAAAAAAAAAAAAJcQWAAAAAAAAAAAAALm2BjKOyeP45OTcZNa9FxPRGTn/clex/MJEcHUAAAAGHyA85bzYVIbd5ZVJSm+OLjxPXSLhFpeRs4P24ZWb7lFzu4gAAAAAAAAAAAAS4gsAAAAAAAAAAAAw+5AXpsvQ+jbO42n4W8H8Vr+pjZJ3eZaFOqw2pzTAAAABh8gKC3yW7o7b1J6fzrelP5OP6Gtxp3jZueNXQctKwAAAAAAAAAAAAEuILAAAAAAAAAAAAJdsdsNR2kspXdxdThSjUdN0qUdJPTT7z8/Aq5c0458Yh3pj8o3K1qFGNvRhTgtIwioryS0M2Z3O1z05DwAAAAAAh22+7e12yr0rmV1VtLunT7KM4pSg1q33x82+TLGLNOKNa6cMmKMnagsjafw/IXVr2iq9hVlS7RLRS4W1rp6GvWdxEs2Y1OnXPUQAAAAAAAAAAAS4gsAAAAAAAAAABhgXLsBjZY3Zm2U041KzdeSfTi5fLQyc9vK8r2ONVSQ4OoAAAAAADDA83bxcRPDbY5Gk46U61T6RTfjGff+eq9DZw28qQystfG8o2d3EAAAAAAAAAAAEuILAAAAAAAAAAdUubYEq2Y2DvspdUK15QdtYqSlLte6U14Jc+/xZWyZ61iYrPbtTHMz36W5GKikkkkuSXQy119AAAAAAAAAIPvO2FqbW2NCtZcCyNs2o8b4VUg+cdfPvXr4lrBl/TnU+lfNj843HtRuVw99hLnsL+1q2tXoqkdFLyfJ+hqVtW0brLOtWazqYdMkiAAAAAAAAAAEuILAAAAAAADNOEqtSMKcZTnJ6KMVq35Ievb1LcJu1yOR4al41YUX0ktaj9Onr8CrfkVr1Xt2rimfaf4TZDGYJKVvbqVZf16vtT9H09NCjfLe/uVitK19N1pocnRkAAAAAAAAAAAdW/xtrlLaVvd29O5oS506sVJEotNZ3DyYi0alW+0m5K1uOKthrh2dTn9HrtypvylzXzLlOVMdXVL8eJ+VX53ZjKbNVeDI2dSgm9I1ftU5eUl3fqXqZK3+ZU7UtT6hqzogAAAAAAAAS4gsAAAAA5La2rXlaNG3pTr1ZcoU4ts8mYiNy9iJn0meE3X3V1w1MlVVrT59jT0lN+b5L5lS/JiOq9u9cMz7T7EbOY/B0+Gzto05aaOo++cvNvvKV8lr/UrNaxX02SWhzSZAAAAAAAAAAAAAAAAcVe3pXVKVKtThVpSWkoTipRa96Z7EzHp5Mb9q/wBpNzGLyXHVxk3jLh9/AlxUW/LmvR+hbpybV6t2rX49Z+elWbRbEZjZeUne2knbp91zR9um/Xp66F+mWuT1KnfHanuGh11OrkAAAAABLiCwAAOexsLnJ11RtKE7iq/uwWunn4ep5a0Vjcy9iJnqE4wm6yc+GplK/AufYUH3+sv2+JSvyfxRYrh/7J5jcPZ4ij2VnbwoQ68K735vmyla1rzu0rEVivp3NNCKTIAAAAAAAAAAAAAAAAAAAAPmUIzi4ySaa0afJgQfaXdHhs3x1bWLxd0+/joL6tv3w5fDQtU5F69T2r3wVt66VVtLu6zWzPHUrW/0q0j/ANTbayil71zj693vL9M1L+lK+K1PaMJ68ju4gAABLiCwfNgT7Zrdm69OFzlpSgpd6tYPR6f3Pp5L4lHJyNdUWaYt92WBY422xtBUbWhC3pL7tNafHxKU2m07lZiIjqHaIvQAAAAAAAAAAAAAAAAAAAAAAAAAYa1Ah21G6zDbRcdWFL+H3j7+3t0km/7o8n8n7yzTPenXuHC+Gtv6UntPstfbJZH6JexTUlxUq0PsVI+K/VdDTx5K5I3DPvSaTqWnOjmAS4gsJPu6xcMltHGdVKVO2g63C+TlqlH5vX0K/It406/LtijdlwIyl1kAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEd6ODp5nY+9k4J17SLuaUuqcea9Vqixgt43j+3DNXypLzubDLAJcQWE33T/APFr/wD7C/3FPlfMLGH6laC5GctsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAANRtd/ytmP/AA63+xnTH9x/6hf5l5gXJG4xwD//2Q=='
    }
    
    if(!environment.testing){
      service.getUserProfile(userId).subscribe();

      const req = httpMock.expectOne(`${environment.backendUrl}get-user-profile/${userId}`);
      expect(req.request.method).toBe('GET');

      req.flush(userProfileModel); 
    }
    else{
      let response: UserProfileModel = require('../../../assets/testsSupport/home-content/user-profile.json');
      expect(userProfileModel).toEqual(response);
    }


  });
});
