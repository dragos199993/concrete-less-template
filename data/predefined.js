const header = `
// HEADER

// Navigation
.navbar{
    border-radius: 0; border: none; box-shadow: none; margin-bottom: 0;
    .navbar-collapse {
        &.collapse {
            &.in {
            }
        }
        .screen-sm({border-top: none; box-shadow: none; padding-top: 30px;});
    }

    .navbar-toggle {
        width: 40px; height: 40px; padding: 0; border: 0; background: transparent;
        &:hover,
        &:focus{
            background-color : transparent;
        }
        .icon-bar { 
            width: 25px; height: 2px; background: #003A67; display: block;
            position: absolute; top: 20px; left: 7px; right: 5px;
            .transition(all 0.3s ease);
            &:before {
                content: ""; width: 100%; height: 2px; background-color: #003A67; transition-property: transform, top; transition-duration: 0.3s, 0.3s; transition-delay: 0s, 0.3s;
                position: absolute; left: 0; top: -5px;
            }
            &:after {
                content: ""; width: 100%; height: 2px; background-color: #003A67; transition-property: transform, bottom; transition-duration: 0.3s, 0.3s; transition-delay: 0s, 0.3s;
                position: absolute; left: 0; bottom: -5px;
            }
        }
        &:not(.collapsed){
            .icon-bar {
                background: none;
                &:before {
                    top: 0; transition-property: top, transform; transition-delay: 0, 0.3s;
                    .rotate(45deg);
                }
                &:after {
                    bottom: 0; transition-property: bottom, transform; transition-delay: 0, 0.3s;
                    .rotate(-45deg);
                }

            }
        }
    } 

    .navbar-brand {
        height: auto; padding: 0;
        img {
            .screen-md({max-width: 150px;});
        }
    }
}

`;

const generalStyles = `
body {font-size: @body-font-size; line-height: @body-line-height; color: @body-text-color; font-family: @font-main; background: @body-background;}

.ccm-page {
	a {
		color: @body-text-color;
		.transition(all 0.3s ease);
		&:hover {
			color: @theme-color;
		}
	}
	.btn {
		padding: @btn-padding; font-size: @btn-font-size; border: 1px solid transparent;
		.border-radius(@btn-radius);
		.transition(all 0.3s ease);
		&.btn-default {
			color: @btn-default-color; background: @btn-default-bg;
			&:hover {
				color: @btn-default-color-hover; background: @btn-default-bg-hover;
			}
		}
		&.btn-secondary {
			color: @btn-secondary-color; background: @btn-secondary-bg;
			&:hover {
				color: @btn-secondary-color-hover; background: @btn-secondary-bg-hover;
			}
		}
	}
	h1, h2, h3, h4, h5, h6 {
		color: @body-heading-color;
	}
	form {
		.placeholder(@theme-color, @body-font-size);
		select.form-control {
			-webkit-appearance: none; -moz-appearance: none;
			+ .placeholder {
					display: none;
				}
		} 
		.select-wrapper {
			position: relative; overflow: hidden;
			&:before {
				content: '\f078'; width: 40px; height: 30px; line-height: 30px; text-align: center; color: @body-text-color; font-family: @font-icon;	
				position: absolute; right: 0; top: 5px; pointer-events: none;
			}
		}
		::-webkit-input-placeholder {line-height: normal !important;}
		::-moz-input-placeholder {line-height: normal !important;}
		::-ms-input-placeholder {line-height: normal !important;}

	}
}
.cc-cookies {
	text-shadow: none; background: fade(@cookiebar-bg, 90%);
	a {
		&.cc-cookie-accept {
			padding: 0 10px; text-shadow: none; color: @cookiebar-btn-color; background: @cookiebar-btn-bg;
			.border-radius(@btn-radius);
			.transition(all 0.3s ease);
			&:hover {
				color: @cookiebar-btn-color; background: @cookiebar-btn-bg;
				.opacity(0.8);
			}
		}
	}
}

.row,
.container-fluid > .navbar-collapse,
.container-fluid > .navbar-header,
.container > .navbar-collapse,
.container > .navbar-header {
	margin-left: -@gutter; margin-right: -@gutter;
}

@media (min-width: (@container-width + 30)) {
  .container {width: @container-width;}
}

.container,
.navbar-collapse,
[class^="col"] {
	padding-left: @gutter; padding-right: @gutter;
}

/* Custom checkbox */
.section {
    /* Custom checkbox */
    [type="checkbox"]:not(:checked),
    [type="checkbox"]:checked { position: absolute; left: -9999px; }
    [type="checkbox"]:not(:checked) + label,
    [type="checkbox"]:checked + label { position: relative; padding-left: 25px; font-weight: 400; cursor: pointer; }

    /* checkbox aspect */
    [type="checkbox"]:not(:checked) + label:before,
    [type="checkbox"]:checked + label:before { content: ''; width: 15px; height: 15px; position: absolute; left: 0; top: 5px; border: 1px solid @checkbox-border; background: #fff; }
    /* checked mark aspect */
    [type="checkbox"]:not(:checked) + label:after,
    [type="checkbox"]:checked + label:after { content: ""; width: 9px; height: 9px; position: absolute; left: 3px; top: 8px; transition: all 0.2s ease; background: @checkbox-color;
    }
    /* checked mark aspect changes */
    [type="checkbox"]:not(:checked) + label:after { opacity: 0; transform: scale(0); }
    [type="checkbox"]:checked + label:after { opacity: 1; transform: scale(1); }
    /* disabled checkbox */
    [type="checkbox"]:disabled:not(:checked) + label:before,
    [type="checkbox"]:disabled:checked + label:before { box-shadow: none; border-color: #d6d6d6; background-color: #fff; }
    [type="checkbox"]:disabled:checked + label:after { color: #999; }
    [type="checkbox"]:disabled + label { color: #aaa; }
    /* accessibility */
    [type="checkbox"]:checked:focus + label:before,
    [type="checkbox"]:not(:checked):focus + label:before { border: 1px dotted #d6d6d6; }
    label:hover:before { border: 1px solid @checkbox-color !important; }

    /* Custom radio */
    [type="radio"]:checked,
    [type="radio"]:not(:checked) { position: absolute; left: -9999px; }
    [type="radio"]:checked + label,
    [type="radio"]:not(:checked) + label { position: relative; padding-left: 28px; padding-right: 15px; cursor: pointer; line-height: 20px; color: @body-text-color; font-weight: 400; display: inline-block; }
    [type="radio"]:checked + label:before,
    [type="radio"]:not(:checked) + label:before { content: ''; position: absolute; left: 0; top: 0; width: 20px; height: 20px; border: 1px solid @radio-border; border-radius: 100%; background: #fff; }
    [type="radio"]:checked + label:after,
    [type="radio"]:not(:checked) + label:after { content: ''; width: 20px; height: 20px; position: absolute; top: 0px; left: 0px; border-radius: 100%; background: @radio-color; -webkit-transition: all 0.2s ease; transition: all 0.2s ease; }
    [type="radio"]:not(:checked) + label:after { opacity: 0; -webkit-transform: scale(0); transform: scale(0); }
    [type="radio"]:checked + label:after { opacity: 1; -webkit-transform: scale(1); transform: scale(1); }
}

html.ccm-toolbar-visible div#ccm-panel-overlay {
	top:48px;
}




// Search results - Pagination style
.ccm-pagination-wrapper{
	li{
		span{
			color: @theme-color;
		}
		a{
			color: @theme-color;
			border:1px solid @theme-color;
			&:hover{
				background-color:@theme-color;
				color:@body-background;
				border:1px solid @theme-color;
			}
		}
	}
	li.active{
		span{background-color:@theme-color; border-color: @theme-color;
			&:hover{background-color:@theme-secondary-color; border-color: @theme-color; color:@theme-color;}
		}
	}
}
`

const slider = `
.slider {
	max-height: 130px; overflow: hidden; position: relative;
	.transition(all 0.2s ease);
	&:after {
		content: '\f110'; width: 20px; height: 20px; line-height: 20px; text-align: center; position: absolute; left: 50%; top: 50%; font-family: @font-icon;
		.translate(-50%,-50%);
	}
	div {
		visibility: hidden;
		.transition(all 0.2s ease); // This is causing some issues when slider is set to infinite mode. 
	}
	&.slick-initialized {
		max-height: 10000px; background: none;
		div {
			visibility: visible;
		}
		&:after {
			display: none;
		}
	}
}

.slick-slider {
    position: relative; display: block; box-sizing: border-box;
    -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; -khtml-user-select: none; -ms-touch-action: pan-y; touch-action: pan-y; -webkit-tap-highlight-color: transparent;
	.slick-list {
		position: relative; display: block; overflow: hidden;	margin: 0; padding: 0;
	}
	.slick-list:focus {
		outline: none;
	}

	.slick-list.dragging {
		cursor: pointer; cursor: hand;
	}

	.slick-slider .slick-list,
	.slick-slider .slick-track {
		-webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); -ms-transform: translate3d(0, 0, 0); -o-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);
	}
	.slick-track {
		position: relative;	top: 0; left: 0; display : block;
	}
	.slick-track:after,
	.slick-track:before {
		display: table; content: '';
	}
	.slick-track:after {
		clear: both;
	}

	.slick-loading {
		.slick-track {
			visibility: hidden;
		}
		.slick-slide {
			display   : none;
		}
	}
	.slick-slide {
		float: left; height: 100%;	min-height: 1px;}
	.slick-slide img {
		display: block;
	}
	.slick-slide.slick-loading img {
		display: none;
	}
	.slick-slide.dragging img {
		pointer-events: none;
	}
	.slick-initialized .slick-slide {
		display: block;
	}
	.slick-loading .slick-slide {
		visibility: hidden;
	}
	.slick-vertical .slick-slide {
		display: block; height: auto; border: 1px solid transparent;
	}

	.slick-arrow {
		width: 50px; height: 50px; padding: 0; line-height: 50px; text-align: center; font-size: 0; text-indent: -9999px; border: 0; position: absolute; left: 15px; top: 50%; z-index: 99; border-radius: 100%;;
		&:before {
			content: '\f177'; width: 50px; height: 50px; line-height: 50px; text-indent: 0; font-size: 20px; position: absolute; left: 0; top: 0; font-family: @font-icon; 
		}
		&.slick-next {
			left: auto; right: 15px;
			&:before {
				content: '\f178'; 
			}
		}
		&.slick-hidden {
			display: none;
		}
		&.slick-disabled {
			opacity: 0.4;
		}
	}
	.slick-dots {
		margin: 0; padding: 0; list-style: none; text-align: center;
		li {
			margin: 10px; display: inline-block;
			button {
				display: block; width: 5px; height: 5px; padding: 0; line-height: 0; font-size: 0; text-indent: -9999px; border-radius: 50%; border: 0; cursor: pointer; outline: none; position: relative;
				.transition(all 0.3s ease);
				&:before {
					content: ""; width: 10px; height: 10px; border-radius: 50%; background: none;
					.transition(all 0.3s ease);
				}
				&:after {
					content: ""; width: 20px; height: 20px; border-radius: 50%; border: 2px solid transparent;
					.transition(all 0.3s ease);
				}
			}
			&.slick-active {
				button {
					&:before {
					}
					&:after {
					}
				}
			}
		}
	}
}
`;

const mixins = `
/* Media-Queries ================================================================= */
.screen-xxs(@rules)         { @media (max-width: @screen-xxs-max)  { @rules();}}
.screen-xs(@rules)          { @media (max-width: @screen-xs-max)  { @rules();}}
.screen-sm(@rules)          { @media (max-width: @screen-sm-max)  { @rules();}}
.screen-md(@rules)          { @media (max-width: @screen-md-max)  { @rules();}}
.screen-lg(@rules)          { @media (max-width: @screen-lg-max)  { @rules();}}
.screen-custom(@rules, @size)      { @media (max-width: @size)  { @rules();}}
.screen-xlg(@rules)         { @media (max-width: @screen-lg-max)  { @rules();}}
.screen-xs-min(@rules)          { @media (min-width: @screen-xs-max)  { @rules();}}
.screen-lg-min(@rules)      { @media (min-width: @screen-lg-min)  { @rules();}}
.screen-xlg-min(@rules)     { @media (min-width: @screen-xlg-min) { @rules();}}
.retina(@rules) 			{ @media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only and (min-resolution: 1.5dppx)  { @rules();}}

/* Vertical-Gradient */
.gradient( @start, @end ) {
    background: @start;
    filter: ~"progid:DXImageTransform.Microsoft.gradient( startColorstr='@start', endColorstr='@end',GradientType=0 )";
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,@start), color-stop(100%,@end)); 
 
    background: -webkit-linear-gradient(left,  @start 0%, @end 100%); 
    background:    -moz-linear-gradient(left,  @start 0%, @end 100%);
    background:     -ms-linear-gradient(left,  @start 0%, @end 100%); 
    background:      -o-linear-gradient(left,  @start 0%, @end 100%); 
    background:         linear-gradient(left,  @start 0%, @end 100%);    
}

/* Horizontal-Gradient */
.horizontal-gradient (@startColor: white, @endColor: white) {
    background-color         : @startColor;
    background-image         : -webkit-gradient(linear, left top, right top, from(@startColor), to(@endColor));
    background-image         : -webkit-linear-gradient( left, @startColor, @endColor);
    background-image         : -moz-linear-gradient(    left, @startColor, @endColor);
    background-image         : -ms-linear-gradient(     left, @startColor, @endColor);
    background-image         : -o-linear-gradient(      left, @startColor, @endColor);
}

/* Animation */
.animation (@name, @duration:300ms, @delay:0, @ease:ease-in-out) {
    -webkit-animation        : @name @duration @delay @ease;
    -moz-animation           : @name @duration @delay @ease;
    animation                : @name @duration @delay @ease;
}

/* Border radius */
.border-radius (@radius: 0px) {
    -webkit-border-radius    : @radius;
    -moz-border-radius       : @radius;
    border-radius            : @radius;
}

/* Opacity */
.opacity( @opacity: 0.5 ) {
    @ieopacity: @opacity * 100;
    filter: ~"alpha(opacity = @{ieopacity} )";
     
    -khtml-opacity: @opacity;
      -moz-opacity: @opacity;
           opacity: @opacity;
}

/* Transition */
.transition (@transition) {
    transition               : @transition;
    -webkit-transition       : @transition;
    -moz-transition          : @transition;
    -o-transition            : @transition;
}

/* Multiple transitions */
// Usage: .transition-multiple(background 0.3s 0.3s, color 0.3s 1000s;);
// !!! Don't forget the semicolon inside the parentheses !!!
.transition-multiple(...) {
    -webkit-transition: @arguments;
    -moz-transition: @arguments;
    -o-transition: @arguments;
    transition: @arguments;
}


/* Transform */
.transform(@string){
    -webkit-transform        : @string;
    -moz-transform           : @string;
    -ms-transform            : @string;
    -o-transform             : @string;
}

/* Rotate */
.rotate (@deg) {
    -webkit-transform        : rotate(@deg);
    -moz-transform           : rotate(@deg);
    -ms-transform            : rotate(@deg);
    -o-transform             : rotate(@deg);
}

/* Rotate */
.blur (@string) {
    -webkit-filter           : blur(@string);
    -moz-filter              : blur(@string);
    -ms-filter               : blur(@string);
    -o-filter                : blur(@string);
    filter                   : blur(@string);
}

/* Skew */
.skew (@deg, @deg2) {
    -webkit-transform        : skew(@deg, @deg2);
    -moz-transform           : skew(@deg, @deg2);
    -ms-transform            : skew(@deg, @deg2);
    -o-transform             : skew(@deg, @deg2);
}

/* Translate */
.translate (@x, @y:0) {
    -webkit-transform        : translate(@x, @y);
    -moz-transform           : translate(@x, @y);
    -ms-transform            : translate(@x, @y);
    -o-transform             : translate(@x, @y);
}

/* Translate 3D */
.translate3d (@x, @y: 0, @z: 0) {
    -webkit-transform        : translate3d(@x, @y, @z);
    -moz-transform           : translate3d(@x, @y, @z);
    -ms-transform            : translate3d(@x, @y, @z);
    -o-transform             : translate3d(@x, @y, @z);
}

/* Perspective */
.perspective (@value: 1000) {
    -webkit-perspective      : @value;
    -moz-perspective         : @value;
    -ms-perspective          : @value;
    perspective              : @value;
}

/* Transform-origin */
.transform-origin (@x:center, @y:center) {
    -webkit-transform-origin : @x @y;
    -moz-transform-origin    : @x @y;
    -ms-transform-origin     : @x @y;
    -o-transform-origin      : @x @y;
}

/* Box-sizing */
.box-sizing (@type: border-box) {
    -webkit-box-sizing       : @type;
    -moz-box-sizing          : @type;
    box-sizing               : @type;
}

/* Box-shadow */
.box-shadow (@string) {
    -webkit-box-shadow       : @string;
    -moz-box-shadow          : @string;
    box-shadow               : @string;
}

/* Text decoration */
.no-underline{
    text-decoration          : none;
    outline                  : medium none;
}
/* Animation */
.animation(@name; @duration: 2s; @iteration: infinite; @timing: linear) {
    -webkit-animation: @arguments;
            animation: @arguments;
  }
  
  .keyframes(@prefix) when (@prefix = webkit) {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(359deg); }
  }
  
  .keyframes(@prefix) when (@prefix = none) {
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }
  
  .keyframes(@prefix) {
  
  }
.placeholder(@color, @font-size) {
    ::-webkit-input-placeholder {color: @color; font-size: @font-size;}
    ::-moz-placeholder {color: @color; font-size: @font-size;}
    :-ms-input-placeholder {color: @color; font-size: @font-size;}
}`

module.exports = {
  header,
  generalStyles,
  slider,
  mixins
};
