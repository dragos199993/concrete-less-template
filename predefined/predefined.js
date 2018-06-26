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

module.exports = {
  slider
};