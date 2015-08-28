let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /project/flappy-bird/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +3 application.js
badd +78 game.js
badd +49 game/models/bird.js
badd +179 /project/webgl-startup/application.js
badd +31 /project/webgl-startup/glMatrix-0.9.5.min.js
badd +34 lib/glMatrix-0.9.5.min.js
badd +34 lib/glmatrix.js
badd +4 game/shaders/bird.vert
badd +35 /project/webgl-startup/index.html
badd +31 game/shaders.js
badd +14 game/models/level.js
args application.js
edit game/models/bird.js
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd t
set winheight=1 winwidth=1
exe '1resize ' . ((&lines * 18 + 22) / 45)
exe '2resize ' . ((&lines * 24 + 22) / 45)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 43 - ((5 * winheight(0) + 9) / 18)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
43
normal! 05|
wincmd w
argglobal
edit game/models/level.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 5 - ((4 * winheight(0) + 12) / 24)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
5
normal! 0
lcd /project/flappy-bird/src
wincmd w
2wincmd w
exe '1resize ' . ((&lines * 18 + 22) / 45)
exe '2resize ' . ((&lines * 24 + 22) / 45)
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
