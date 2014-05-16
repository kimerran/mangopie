using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace mangopie.Controllers
{
    [RoutePrefix("api")]
    public class MangopieController : Controller
    {
        [Route("img/{id}/{imgid}/{imgtype}")]
        [OutputCache(Duration = 100, VaryByParam="imgid")]
        public ActionResult GetImage(string id, string imgid, string imgtype)
        {
            WebClient wc = new WebClient();
            var s = wc.OpenRead("https://cdn.mangaeden.com/mangasimg/" + id + "/" + imgid + "." + imgtype);
            return base.File(s, "image/png");
        }

        [Route("mng/{id}")]
        [OutputCache(Duration = 100, VaryByParam = "id")]
        public ActionResult GetManga(string id)
        {
            //http://www.mangaeden.com/api/manga/4e70ea03c092255ef70046f0/
            WebClient wc = new WebClient();
            var s = wc.OpenRead("http://www.mangaeden.com/api/manga/" + id);
            return base.File(s, "application/json");
        }

        [Route("chp/{id}")]
        [OutputCache(Duration = 100, VaryByParam = "id")]
        public ActionResult GetChapter(string id)
        {
            //https://www.mangaeden.com/api/chapter/5332795145b9ef489da65501
            WebClient wc = new WebClient();
            var s = wc.OpenRead("http://www.mangaeden.com/api/chapter/" + id);
            return base.File(s, "application/json");
        }
    }
}